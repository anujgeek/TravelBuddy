﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web;

namespace TravelBuddyService
{
    public class Utilities
    {
        public const string JSON_EMPTY_OBJECT = "{}";
        public const string JSON_EMPTY_ARRAY = "[]";
        public const string SUCCESS = "Success";
        public const string FAILURE = "Failure";
        public const string EXCEPTION = "Exception";

        public static string JsonSerialize<T>(T t)
        {
            MemoryStream stream = new MemoryStream();
            DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(T));

            serializer.WriteObject(stream, t);
            string s = Encoding.UTF8.GetString(stream.ToArray());
            stream.Close();

            return s;
        }

        public static T JsonDeSerialize<T>(string s)
        {
            if (string.IsNullOrWhiteSpace(s))
            {
                s = JSON_EMPTY_OBJECT;
            }

            MemoryStream stream = new MemoryStream(Encoding.UTF8.GetBytes(s));
            DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(T));

            T t = (T)serializer.ReadObject(stream);
            stream.Close();

            return t;
        }
    }
}