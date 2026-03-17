'use client'
import { AppDispatch } from '@/redux/store';
import { setuserData } from '@/redux/userSlice';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function Userdataredux() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const userdata = async () => {
      try {
        const result = await axios.get('/api/me');
        // console.log('user redux data: ',result.data);
        dispatch(setuserData(result.data));

      } catch (error) {
        console.log(`user redux error ${error}`);
      }
    };
    userdata();
  }, []);
}

export default Userdataredux
