using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Youtify.Models
{
    public class CreatePlaylist
    {
        public string Code { get; set; }
        public List<string> LikedVideos { get; set; }
    }
}
