using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SpotifyAPI.Web;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Youtify.Models;

namespace Youtify.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpotifyController : ControllerBase
    {
        private SpotifyClient spotifyClient;
        private readonly string redirectUrl = "http://localhost:4200/home/";
        private readonly string clientId = "5176332b04a34d7a8859dff657d968d6";
        private readonly string clientSecret = "26601a2635a94e918082804dae217401";

        [HttpGet]
        public async Task<string> GetAsync()
        {
            var loginRequest = new LoginRequest(new Uri(redirectUrl),
                                                    clientId,
                                                    LoginRequest.ResponseType.Code
                                                )
            {
                Scope = new[] { Scopes.PlaylistReadPrivate, Scopes.PlaylistReadCollaborative, Scopes.PlaylistModifyPrivate, Scopes.PlaylistModifyPublic }
            };
            loginRequest.ShowDialog = true;
            var x = loginRequest.CodeChallenge;
            var y = loginRequest.CodeChallengeMethod;
            var uri = loginRequest.ToUri();
            return uri.AbsoluteUri;
        }

        [HttpPost("CreatePlaylistAsync")]
        public async Task<AuthorizationCodeTokenResponse> CreatePlaylistAsync([FromBody] CreatePlaylist createPlaylist)
        {
            try
            {

                var response = await new OAuthClient().RequestToken(new AuthorizationCodeTokenRequest(clientId, clientSecret, createPlaylist.Code, new Uri(redirectUrl)));

                if (response.IsExpired)
                {
                    var newResponse = await new OAuthClient().RequestToken(new AuthorizationCodeRefreshRequest(clientId, clientSecret, response.RefreshToken));

                    spotifyClient = new SpotifyClient(newResponse.AccessToken);
                }

                spotifyClient = new SpotifyClient(response.AccessToken);

                var user = spotifyClient.UserProfile.Current();
                //var playlists = await spotifyClient.Playlists.GetUsers(user.Result.Id);

                var playlistCreateRequest = new PlaylistCreateRequest("My Liked Songs");
                playlistCreateRequest.Description = "This playlist created from my YoutubeToSpotify Project. This project creating playlist which is liked videos from youtube.";
                playlistCreateRequest.Public = true;


                var createdPlaylist = await spotifyClient.Playlists.Create(user.Result.Id, playlistCreateRequest);
                var likedVideoUrisFromSpotify = new List<string>();

                foreach (var likedVideo in createPlaylist.LikedVideos)
                {
                    string title = likedVideo;
                    if (title.Contains("("))
                        title = title.Substring(0, title.IndexOf("("));
                    if (title.Contains("["))
                        title = title.Substring(0, title.IndexOf("["));

                    var searhRequest = new SearchRequest(SearchRequest.Types.Track, title);

                    var searchResult = await spotifyClient.Search.Item(searhRequest);
                    if (searchResult.Tracks != null&& searchResult.Tracks.Items.Count>0)
                    {                        
                        likedVideoUrisFromSpotify.Add(searchResult.Tracks.Items[0].Uri);
                    }
                }

                var addItemRequest = new PlaylistAddItemsRequest(likedVideoUrisFromSpotify);
                await spotifyClient.Playlists.AddItems(createdPlaylist.Id, addItemRequest);


                //var selectedPlaylist = playlists.Items.Where(x => x.Name == "My Liked Songs").FirstOrDefault();
                return response;

            }
            catch (Exception ex)
            {

                throw;
            }
        }

        [HttpGet("GetPlaylists")]
        public async Task<Paging<SimplePlaylist>> GetPlaylistsAsync(string code)
        {
            try
            {

                var response = await new OAuthClient().RequestToken(new AuthorizationCodeTokenRequest(clientId, clientSecret, code, new Uri(redirectUrl)));

                if (response.IsExpired)
                {
                    var newResponse = await new OAuthClient().RequestToken(new AuthorizationCodeRefreshRequest(clientId, clientSecret, response.RefreshToken));

                    spotifyClient = new SpotifyClient(newResponse.AccessToken);
                }
                else
                {
                    spotifyClient = new SpotifyClient(response.AccessToken);
                }

                var user = spotifyClient.UserProfile.Current();
                var playlists = await spotifyClient.Playlists.GetUsers(user.Result.Id);
                return playlists;

                //var selectedPlaylist = playlists.Items.Where(x => x.Name == "My Liked Songs").FirstOrDefault();           

            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}