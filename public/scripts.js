

const socket= io('/');
let videoGrid = document.getElementById('video-grid');
const myPeer = new Peer();
let myVideoStream;
 let myVideo = document.createElement('video');
 myVideo.muted=true;
const peers = {}
navigator.mediaDevices.getUserMedia({
   video: true,
   audio: true
}).then(stream=>{
   myVideoStream=stream;
   addVideoStream(myVideo, stream)

   myPeer.on('call', call=>{
      call.answer(stream);
      const video = document.createElement('video');
      call.on('stream', userVideoStream => {
         addVideoStream(video, userVideoStream);
      })
   })

   socket.on('user-connected', userId => {
      connectToNewUser(userId, stream);
   })
})

socket.on('user-disconnected', userId => {
   if(peers[userId]) peers[userId].close()
})

myPeer.on('open', id=>{
   socket.emit('join-room', ROOM_ID, id)
   console.log(id);
})


socket.on('user-connected', userId =>{
   console.log('User connected: '+ userId);
})

function connectToNewUser(userId, stream) {
   const call = myPeer.call(userId, stream)
   const video = document.createElement('video');
   call.on('stream', userVideoStream=>{
      addVideoStream(video, userVideoStream)
   })
   call.on('close', () => {
      video.remove()
   })

   peers[userId]=call
}

function addVideoStream(video, stream) {
   video.srcObject = stream
   video.addEventListener('loadedmetadata', () => {
     video.play()
   })
   videoGrid.append(video)
}



function displayLocalStreamAndSignal() {//firsttime
   //const video = document.createElement('video');
       navigator.mediaDevices.getDisplayMedia({
           audio: true,
           video: true
       }).then(stream=>{
         // myVideoStream=stream;
         myPeer.on('call', call=>{
            call.answer(stream);
            const video = document.createElement('video');
            call.on('stream', userVideoStream => {
               addVideoStream(video, userVideoStream);
            })
         })
      
         socket.on('user-connected', userId => {
            connectToNewUser(userId, stream);
         })
     })
};



const playStop = () => {
   let enabled = myVideoStream.getVideoTracks()[0].enabled;
   const phase = document.getElementById('phase').innerHTML;
   if (enabled) {
     myVideoStream.getVideoTracks()[0].enabled = false;
     
   }
   else {
     
     myVideoStream.getVideoTracks()[0].enabled = true;
   }
 }

const muteUnmute = () => {
   const enabled = myVideoStream.getAudioTracks()[0].enabled;
   if (enabled) {
     myVideoStream.getAudioTracks()[0].enabled = false;
   } else {
     myVideoStream.getAudioTracks()[0].enabled = true;
   }
}
 

