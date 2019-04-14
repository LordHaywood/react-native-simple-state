React Native Simple State
===========================
[![nBuild Status](https://travis-ci.org/HaywoodSolutions/react-native-simple-state.svg?branch=master)](https://badge.fury.io/js/react-native-category)

React Native Components State doesn't provide a clean way to update or retreive nested object elements. React Native Simple State is a way to solve this by adding further methods to state providing editing sub elements without having to requesting the whole state to update a single node deep within the object.

You will need to use a key to access specific nested objects, using full stops to seperate the keys for each objects. Therfore using ```posts.2.author.name``` would link to ```John Smith``` from the following object. With ```posts``` being the first element from the main object, then ```2``` will take the element from the array with index ```2```. Finally ```author.name``` will retreve the author object from the selected nested post object and retrive the name value.

 ```json
{
  "posts": [
    {
      "author": {
        "name": "Dave Turner"
      }
    },
    {
      "author": {
        "name": "John Smith"
      }
    }
  ]
}
 ```

This library provides an Component super class that can be used in replacement of the React Native Component super class. It is to use as it light weight and only will need an extra import line, and using saves your development time, code space and improves your effeciency.

The following example creates a component that will allow use of the extra fuctionality provided by React Native Simple State:

 ```jsx
import React from 'react';
import Component from 'react-native-simple-state';

class SimpleStateComponent extends Component {
  constructor(props) {
    super(props);
  }
};
 ```


Install
=======
```npm install react-native-simple-state --save```


Usage
=====

# Getting Started

## Importing
Import the Component like this

 ```jsx
import Component from 'react-native-simple-state';
 ```

## Linking to React Native Component
Import the Component like this, just as you would with the React Native Component. Don't forget to parse the props of the parent.

 ```jsx
class SimpleStateComponent extends Component {
  constructor(props) {
    super(props);
  }
  ...
}
 ```

# Methods

## placeState
Sets the provided value into the current state at the nested object identified by the key provided as parameter.

### Params
| name    | type   | description                                                                 |
| ------- | ------ | --------------------------------------------------------------------------- |
| `key`   | string | The key that specifies the nested object to insert the value into the state |
| `value` | object | The value to insert at the specified nested object                          |


### retreveState
Gets the value from the current state at the nested object identified by the key provided as parameter.

### Params
| name    | type   | description                                                                 |
| ------- | ------ | --------------------------------------------------------------------------- |
| `key`   | string | The key that specifies the nested object retreve the value from the state   |

### Returns
| type   | description                                                                           |
| ------ | ------------------------------------------------------------------------------------- |
| object | The value that was in the current state at the specified nested object from the key   |


# Examples

## Getting a Post
This examplar module allows you to get a post by using the key to get a specific.

 ```jsx
import React from 'react';
import Component from 'react-native-simple-state';

class CreatePostComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {
          author: {
            name: "Bob Turner"
          },
          body: "Hello"
        }
      ]
    };
  }
  
  getPost(postId) {
    this.retreveState(`posts.${postId}`);
  }
}
 ```


## Adding Post
This examplar module allows you to create a post by creating a object and adding it directly into a nested object (in this case, and array).

 ```jsx
import React from 'react';
import Component from 'react-native-simple-state';

class CreatePostComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }
  
  createPost(postId, authorName, body) {
    this.placeState(`posts.${postId}`, {
      author: {
        name: authorName
      },
      body: body,
      lastUpdated: new Date()
    });
  }
}
 ```