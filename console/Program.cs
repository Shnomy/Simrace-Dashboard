using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Sockets;
using System.Text;

using System.Threading;
using System.Threading.Tasks;
using System.Xml;
using Microsoft.AspNetCore.SignalR.Client;
using console.Models;


namespace console
{
    class Program
    {
        static HubConnection connection;
        public static void Main(string[] args)
        {
            
            Console.WriteLine("Console App Starting...");
            
            Build();

            Connect();
            

            UdpLoop();
            //TestLoop();

        }

        private static void TestLoop()
        {
            var cancellationTokenSource = new CancellationTokenSource();
            
            Task.Run(() => MainAsync(cancellationTokenSource.Token)
                    .GetAwaiter()
                    .GetResult(),
                cancellationTokenSource.Token);
            
            Console.WriteLine("Press Enter to Exit...");
            Console.ReadLine();

            cancellationTokenSource.Cancel();
        }

        private static async Task MainAsync(CancellationToken cancellationToken)
        {
            
            // Random numbers for testing
            Random rnd = new Random();
            double value = 0.0d;

            while (!cancellationToken.IsCancellationRequested)
            {
                await Task.Delay(1000, cancellationToken);
                
                //Generate random testing value
                //value = Math.Min(Math.Max(value + (10 - rnd.NextDouble() / 5.0), -1), 1);
                value++;
                var data = new LiveData { Timestamp = DateTime.UtcNow, Speed = value };
                
                SendData(data);
            }

            await connection.DisposeAsync();
        }

        private static void Build()
        {
            connection = new HubConnectionBuilder()
                .WithUrl("http://localhost:5000/chatHub")
                .Build();
            
            connection.Closed += async (error) =>
            {
                await Task.Delay(new Random().Next(0,5) * 1000);
                Console.WriteLine("Retrying Connection...");
                await connection.StartAsync();
            };
        }
        private static async void Connect()
        {
            connection.On<string>("ReceiveIp", (ip) =>
            {
                Console.WriteLine("Connecting to IP: {0}", ip);
                Ip = IPAddress.Parse(ip);
                groupEp = new IPEndPoint(Ip, ListenPort);
                
                WaitingForConnection = false;
            });

            Console.WriteLine("Trying Async...");
            
            try
            {
                await connection.StartAsync();
                Console.WriteLine("Connected.");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Catched exception: ");
                Console.WriteLine(ex.Message);
            }
        }
        
        /*private static async void Send()
        {
            try
            {
                await connection.InvokeAsync("SendMessage", 
                    "user", "HEI");
            }
            catch (Exception ex)
            {                
                Console.WriteLine(ex.Message);                
            }
        }*/
        
        private const int ListenPort = 11000;
        private static IPAddress Ip = IPAddress.Parse("10.10.10.10");
        private static int counter;
        private static Boolean WaitingForConnection = true;
        
        static UdpClient listener = new UdpClient(ListenPort);
        static IPEndPoint groupEp = new IPEndPoint(Ip, ListenPort);
        
        private static async void UdpLoop()
        {
            while (WaitingForConnection)
            {
                Console.WriteLine("Waiting for Client...");
                Thread.Sleep (1000);
            }
            
            try
            {
                while (true)
                {
                    byte[] bytes = listener.Receive(ref groupEp);
                    SendBytes(bytes);
                    counter++;
                    if (counter >= 30)
                    {
                        
                        StoreBytes(bytes);
                        counter = 0;
                    }
                    
                }
            }
            catch (SocketException e)
            {
                Console.WriteLine(e);
                Console.WriteLine("Catch");
            }
            finally
            {
                Console.WriteLine("finally");
                listener.Close();
            }
        }
        
        private static async void SendData(LiveData data)
        {
            try
            {
                await connection.InvokeAsync("SendData", data);
                Console.WriteLine("Send data {0} with time {1} and {2}RPM", data.Speed, data.Timestamp, data.RPM);
            }
            catch (Exception ex)
            {                
                Console.WriteLine(ex.Message);                
            }
        }
        
        private static async void SendBytes(byte[] bytes)
        {
            try
            {
                await connection.InvokeAsync("SendBytes", bytes);
                //Console.WriteLine("Sending bytes");
            }
            catch (Exception ex)
            {                
                Console.WriteLine(ex.Message);                
            }
        }
        /*
        private static async void SendBuffer(List<byte[]> buffer)
        {
            try
            {
                await connection.InvokeAsync("SendBuffer", buffer);
                //Console.WriteLine("Sending buffer");
            }
            catch (Exception ex)
            {                
                Console.WriteLine(ex.Message);                
            }
        }
        */
        
        private static async void StoreBytes(byte[] bytes)
        {
            try
            {
                await connection.InvokeAsync("StoreBytes", bytes);
                //Console.WriteLine("Storing bytes");
            }
            catch (Exception ex)
            {                
                Console.WriteLine(ex.Message);                
            }
        }
    }
}
