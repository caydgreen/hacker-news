import React from 'react';
import firebase from './base';
import hackerNews from '../constants/hackerNews';

const fetchy = async (options, success, failure) => {
  const endpoint = options.endpoint;
  delete options.endpoint;

  try {
    let response = await firebase.fetch(`/${hackerNews.DB_VERSION}${endpoint}`, options);
    
    success(response);
  } catch (error) {
    if (failure) {
      failure(error);
    }
  }
};

export default fetchy;
