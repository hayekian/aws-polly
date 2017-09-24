using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

using System.Text;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

using Amazon.Polly;
using Amazon.Polly.Model;
using System.IO;

namespace SampleAngular
{
    
  

    public class WebApiController : HApiController
    {

        JObject web_response = new JObject();
        public static List<Voice> voices = null;


        static WebApiController()
        {
            WebApiController.InitVoices();
        }
        

        [Route("api/test")]
        [HttpGet]
        public string test()
        {
            return "hello";


        }

        /// <summary>
        /// 
        /// load list of voices
        /// 
        /// </summary>
        public static void InitVoices() {
            AmazonPollyClient client = new AmazonPollyClient(Amazon.RegionEndpoint.USEast1);
            // Create describe voices request.
            DescribeVoicesRequest describeVoicesRequest = new DescribeVoicesRequest();
            // Synchronously ask Amazon Polly to describe available TTS voices.
            DescribeVoicesResponse describeVoicesResult = client.DescribeVoices(describeVoicesRequest);
            WebApiController.voices = describeVoicesResult.Voices.OrderBy(ss => ss.LanguageName).ToList();
        }

        [Route("api/GetVoices")]
        [HttpGet]
        public object GetVoices()
        {
            return WebApiController.voices;
        }


        [Route("api/text-to-speech")]
        [HttpPost]
        public object textToSpeech()
        {
            var APP = this.GetPostedJSON();
            try
            {
               
                AmazonPollyClient client = new AmazonPollyClient(Amazon.RegionEndpoint.USEast1);

                var voiceId = voices.SingleOrDefault(v => v.Id.Value == APP["VoiceId"].ToString());


                // Create speech synthesis request.
                SynthesizeSpeechRequest synthesizeSpeechPresignRequest = new SynthesizeSpeechRequest();
                // Text
                synthesizeSpeechPresignRequest.TextType = TextType.Ssml;
                synthesizeSpeechPresignRequest.Text = APP["text"].ToString();
                // Select voice for synthesis.
                synthesizeSpeechPresignRequest.VoiceId = voiceId.Id;
                // Set format to MP3.
                synthesizeSpeechPresignRequest.OutputFormat = OutputFormat.Mp3;
                // Get the presigned URL for synthesized speech audio stream.

               
               
                var presignedSynthesizeSpeechUrl = client.SynthesizeSpeechAsync(synthesizeSpeechPresignRequest).GetAwaiter().GetResult();

               
                MemoryStream mem = new MemoryStream();
                presignedSynthesizeSpeechUrl.AudioStream.CopyTo(mem);
             
                string result = "data:audio/mp3;base64," + System.Convert.ToBase64String(mem.ToArray());
               
                return CreateFrameworkObjResponse(0, null, result);
            }
            catch (Exception ex)
            {
                return CreateFrameworkObjResponse(-1, ex.Message,null);
            }
          

        }
        

    }


    public class HApiController : ApiController
    {

        public HttpResponseMessage GetFileResponse(string filename, byte[] data, string contentType)
        {
            var result = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(data)
            };
            result.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
            {
                FileName = filename
            };
            result.Content.Headers.ContentType = new MediaTypeHeaderValue(contentType);

            return result;
        }

        public JObject GetPostedJSON()
        {
            try
            {
                return JObject.Parse(this.GetPostedString());
            }
            catch (Exception ex)
            {

                return new JObject();

            }
        }

        public string GetPostedString()
        {
            return this.Request.Content.ReadAsStringAsync().Result;
        }




        public Dictionary<string, object> CreateFrameworkObjResponse(int status, string message, object data)
        {
            Dictionary<string, object> res = new Dictionary<string, object>();
            res["STATUS"] = status;
            res["MSG"] = message;
            res["DATA"] = data;

            return res;


        }



    }

}