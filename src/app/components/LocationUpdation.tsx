'use client'
import { getsocket } from '@/config/socketio'
import { error } from 'console';
import React, { useEffect } from 'react'

function LocationUpdation({userId}:{userId:string}) {
    let socket = getsocket();
    socket.emit('identity',userId);
    useEffect(()=>{
        if(!userId) return;
        if(!navigator.geolocation) return;

         const watchinglocation = navigator.geolocation.watchPosition((pos)=>{
             const latitude = pos.coords.latitude;
             const longitude = pos.coords.longitude;
             socket.emit('updatelocation',{
                userId,
                latitude:latitude,
                longitude:longitude
             })
             console.log('location ka data:',userId,latitude,longitude)
        },(error)=>{
            console.log(error)
        })
        return ()=>navigator.geolocation.clearWatch(watchinglocation);
    },[userId])
  return null
}

export default LocationUpdation
