#ifndef NETWORK_UTILS_H
#define NETWORK_UTILS_H
#include <cstdint>
#include <type_traits>
#include <bit> // For std::endian
namespace NetworkUtils {
 
// Host to network byte order for 32-bit integers (equivalent to htonl)

constexpr uint32_t htonl(uint32_t hostlong) {

    if constexpr (std::endian::native == std::endian::big) {

        // If the host is big-endian, no conversion is needed

        return hostlong;

    } else {

        // If the host is little-endian, perform byte swapping

        return ((hostlong & 0x000000FF) << 24) |

               ((hostlong & 0x0000FF00) << 8) |

               ((hostlong & 0x00FF0000) >> 8) |

               ((hostlong & 0xFF000000) >> 24);

    }

}
 
// Network to host byte order for 32-bit integers (equivalent to ntohl)

constexpr uint32_t ntohl(uint32_t netlong) {

    // Network byte order is big-endian, so same logic as htonl

    return htonl(netlong);

}
}
#endif

 