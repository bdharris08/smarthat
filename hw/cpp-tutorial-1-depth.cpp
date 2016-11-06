// License: Apache 2.0. See LICENSE file in root directory.
// Copyright(c) 2015 Intel Corporation. All Rights Reserved.

/////////////////////////////////////////////////////
// librealsense tutorial #1 - Accessing depth data //
/////////////////////////////////////////////////////

// First include the librealsense C++ header file
#include <librealsense/rs.hpp>
#include <cstdio>
#include <unistd.h>
//#include "mraa.hpp"
#include <cstdio>
#include <stdint.h>
#include <vector>
#include <map>
#include <limits>
#include <iostream>


#define STB_IMAGE_WRITE_IMPLEMENTATION

#include "third_party/stb_image_write.h"

struct stream_record
{
    stream_record(void): frame_data(nullptr) {};
    stream_record(rs::stream value): stream(value), frame_data(nullptr) {};
    ~stream_record() { frame_data = nullptr;}
    rs::stream          stream;
    rs::intrinsics      intrinsics;
    unsigned char   *   frame_data;
};


std::map<rs::stream,int> components_map =
{
    { rs::stream::depth,     3  },      // RGB
    { rs::stream::color,     3  },
};

void normalize_depth_to_rgb(uint8_t rgb_image[], const uint16_t depth_image[], int width, int height)
{
    for (int i = 0; i < width * height; ++i)
    {
        if (auto d = depth_image[i])
        {
            uint8_t v = d * 255 / std::numeric_limits<uint16_t>::max();
            rgb_image[i*3 + 0] = 255 - v;
            rgb_image[i*3 + 1] = 255 - v;
            rgb_image[i*3 + 2] = 255 - v;
        }
        else
        {
            rgb_image[i*3 + 0] = 0;
            rgb_image[i*3 + 1] = 0;
            rgb_image[i*3 + 2] = 0;
        }
    }
}

int main() try
{
    //SETUP BUZZER GPIO
 /*   static int iopin1 = 6;
    static int iopin2 = 8;
    mraa::Gpio* gpio1 = new mraa::Gpio(iopin1);
    mraa::Gpio* gpio2 = new mraa::Gpio(iopin2);
    if (gpio1 == NULL || gpio2 == NULL) {
        return mraa::ERROR_UNSPECIFIED;
    }
    mraa::Result response = gpio1->dir(mraa::DIR_OUT);
    if (response != mraa::SUCCESS) {
        mraa::printError(response);
        return 1;
    }
    response = gpio2->dir(mraa::DIR_OUT);
    if (response != mraa::SUCCESS) {
        mraa::printError(response);
        return 1;
    }
*/

    // Create a context object. This object owns the handles to all connected realsense devices.
    rs::context ctx;
    printf("There are %d connected RealSense devices.\n", ctx.get_device_count());
    if(ctx.get_device_count() == 0) return EXIT_FAILURE;

    // This tutorial will access only a single device, but it is trivial to extend to multiple devices
    rs::device * dev = ctx.get_device(0);
    printf("\nUsing device 0, an %s\n", dev->get_name());
    printf("    Serial number: %s\n", dev->get_serial());
    printf("    Firmware version: %s\n", dev->get_firmware_version());

    // Configure depth to run at VGA resolution at 30 frames per second

    std::vector<stream_record> supported_streams;
    supported_streams.push_back(rs::stream::depth);
    supported_streams.push_back(rs::stream::color);

    std::vector<stream_record> new_stream;
    supported_streams.push_back(rs::stream::color);
/*
    for (int i=(int)rs::capabilities::depth; i <=(int)rs::capabilities::fish_eye; i++)
        if (dev->supports((rs::capabilities)i))
            supported_streams.push_back(stream_record((rs::stream)i));

    for (auto & stream_record : supported_streams)
        dev->enable_stream(stream_record.stream, rs::preset::best_quality);

*/
    dev->enable_stream(rs::stream::color, 640, 480, rs::format::rgb8, 30);
    dev->enable_stream(rs::stream::depth, 640, 480, rs::format::z16, 30);
    dev->start();
/*
    rs::device * rgb = ctx.get_device(0);

    std::vector<stream_record> supported_streams;

        for (int i=(int)rs::capabilities::depth; i <=(int)rs::capabilities::fish_eye; i++)
            if (rgb->supports((rs::capabilities)i))
                supported_streams.push_back(stream_record((rs::stream)i));

        for (auto & stream_record : supported_streams)
            rgb->enable_stream(stream_record.stream, rs::preset::best_quality);
*/
    // Determine depth value corresponding to one meter
    const uint16_t one_meter = static_cast<uint16_t>(1.0f / dev->get_depth_scale());

    supported_streams.erase(supported_streams.begin());

    while(true)
    {
        // This call waits until a new coherent set of frames is available on a device
        // Calls to get_frame_data(...) and get_frame_timestamp(...) on a device will return stable values until wait_for_frames(...) is called
        dev->wait_for_frames();

        // Retrieve depth data, which was previously configured as a 640 x 480 image of 16-bit depth values
        const uint16_t * depth_frame = reinterpret_cast<const uint16_t *>(dev->get_frame_data(rs::stream::depth));

        // Print a simple text-based representation of the image, by breaking it into 10x20 pixel regions and and approximating the coverage of pixels within one meter
         char buffer[(640/10+1)*(480/20)+1];

        char * out = buffer;
        int coverage[64] = {};
        int lcr[3] = {};
        for(int y=0; y<480; ++y)
        {
            for(int x=0; x<640; ++x)
            {
                int depth = *depth_frame++;
                //if(depth > 0 && depth < one_meter) ++coverage[x/10];
                if(depth > 0 && depth < 2*one_meter) ++coverage[x/10];
                if(depth > 0 && depth < 2*one_meter) ++lcr[x/212];
            }

            if(y%20 == 19)
            {
                for(int & c : coverage)
                {
                    *out++ = " .:nhBXWW"[c/25];
                    c = 0;
                }
                *out++ = '\n';
            }
        }
        *out++ = 0;
        //printf("\n%s", buffer);
        //sudo kill -9 `ps -ef | grep blink_left | grep -v grep | awk {'print $2'}`
        if (lcr[0] > 1000)
        {
         //   gpio1->write(1);
            system("sudo node /home/user/smarthat/blinker/toggle_blink.js 6 1");
            printf("Object Left1!");
        }
        else
        {
            system("sudo node /home/user/smarthat/blinker/toggle_blink.js 6 0");
         //   gpio1->write(0);
        }
        if (lcr[2] > 1000)
        {
         //   gpio2->write(1);
            system("sudo node /home/user/smarthat/blinker/toggle_blink.js 8 1");
            printf("Object Right1!");
        }
        else
        {
            system("sudo node /home/user/smarthat/blinker/toggle_blink.js 8 0");
         //   gpio2->write(0);
        }

        if (lcr[1] > 1000)
        {
            system("sudo node /home/user/smarthat/blinker/toggle_blink.js 6 1");
            system("sudo node /home/user/smarthat/blinker/toggle_blink.js 8 1");

         //   gpio2->write(1);
            printf("Object Center1!");
        }
        printf("\n");
        usleep(100 * 1000);
        //printf("left = %d  -  center = %d  -  right = %d\n", lcr[0], lcr[1], lcr[2]);


        // Dump RGB file

        /* retrieve actual frame size for each enabled stream*/
        for (auto & stream_record : supported_streams)
            stream_record.intrinsics = dev->get_stream_intrinsics(stream_record.stream);


        /* Retrieve data from all the enabled streams */
        for (auto & stream_record : supported_streams)
            stream_record.frame_data = const_cast<uint8_t *>((const uint8_t*)dev->get_frame_data(stream_record.stream));

        /* Transform Depth range map into color map */
       // stream_record depth = new_stream[(int)rs::stream::depth];
       // std::vector<uint8_t> coloredDepth(depth.intrinsics.width * depth.intrinsics.height * components_map[depth.stream]);

        /* Encode depth data into color image */
        //normalize_depth_to_rgb(coloredDepth.data(), (const uint16_t *)depth.frame_data, depth.intrinsics.width, depth.intrinsics.height);

        /* Update captured data */
        //new_stream[(int)rs::stream::depth].frame_data = coloredDepth.data();

        /* Store captured frames into current directory*/
        for (auto & captured : supported_streams)
        {
            std::stringstream ss;
            ss << "/home/user/smarthat/pic.png";

            std::cout << "Writing " << ss.str().data() << ", " << captured.intrinsics.width << " x " << captured.intrinsics.height << " pixels"   << std::endl;

            stbi_write_png(ss.str().data(),
                captured.intrinsics.width,captured.intrinsics.height,
                components_map[captured.stream],
                captured.frame_data,
                captured.intrinsics.width * components_map[captured.stream] );
        }

    }

    return EXIT_SUCCESS;
}
catch(const rs::error & e)
{
    // Method calls against librealsense objects may throw exceptions of type rs::error
    printf("rs::error was thrown when calling %s(%s):\n", e.get_failed_function().c_str(), e.get_failed_args().c_str());
    printf("    %s\n", e.what());
    return EXIT_FAILURE;
}
