var express = require('express');
var router = express.Router();
const axios = require('axios');

var ToppleBackendServerName = "localhost:8080/CS201_FinalProject/"
var ToppleBackendServer = "http://" + ToppleBackendServerName;

/* GET */
// Tople signup page
router.get('/signup', function(req, res, next) {
    res.render('signup', {
        title: 'SignUp',
        action_link_signup: ToppleBackendServer + 'TPSignUp',
        layout: 'guest_base'
    });
});

// Topple login page
router.get('/login', function(req, res, next) {
    res.render('login', {
        title: 'Login',
        action_link_login: ToppleBackendServer + 'TPLogin',
        layout: 'guest_base'
    });
});

// Topple home feed page
router.get('/feed', function(req, res, next) {
    res.render('feed', {
        title: 'Feed',
        friend_list_link: ToppleBackendServer + 'TPFriendlist',
        action_link_post_like: ToppleBackendServer + 'TPLikes',
        action_post_comment: ToppleBackendServer + 'TPComment',
        layout: 'logged_in_base'
    });
});

// Topple home feed post card list
router.get('/getFeedPosts', function(req, res, next) {
    axios.get(ToppleBackendServer + 'TPFeed?token=' + req.query.token)
      .then(response => {
          res.render('postcard', {
              feed_posts: response.data,
              layout: false
          });
      })
      .catch(error => {
        console.log(error);
      });
});

// Topple profile feed page
router.get('/profile', function(req, res, next) {
    res.render('profile', {
        title: 'Profile',
        friend_list_link: ToppleBackendServer + 'TPFriendlist',
        action_link_post_like: ToppleBackendServer + 'TPLikes',
        action_post_comment: ToppleBackendServer + 'TPComment',
        action_link_profile_push: ToppleBackendServer + 'TPPush',
        action_link_profile_shove: ToppleBackendServer + 'TPShove',
        layout: 'logged_in_base'
    });
});

// Topple profile user card
router.get('/getUserProfile', function(req, res, next) {
    query_params = "token=" + req.query.token;
    if (req.query.profile_user) {
        query_params += "&profile_user=" + req.query.profile_user;
    }
    axios.get(ToppleBackendServer + "TPUser?" + query_params)
      .then(response => {
          res.render('profilecard', {
              token: req.query.token,
              user_profile: response.data,
              profile_user: req.query.profile_user,
              layout: false
          });
      })
      .catch(error => {
        console.log(error);
      });
});

// Topple profile post card list
router.get('/getProfilePosts', function(req, res, next) {
    query_params = "token=" + req.query.token;
    if (req.query.profile_user) {
        query_params += "&profile_user=" + req.query.profile_user;
    }
    axios.get(ToppleBackendServer + "TPProfile?" + query_params)
      .then(response => {
          res.render('postcard', {
              feed_posts: response.data,
              layout: false
          });
      })
      .catch(error => {
        console.log(error);
      });
});

// Topple search page
router.get('/search', function(req, res, next) {
    res.render('search', {
        title: 'Search',
        friend_list_link: ToppleBackendServer + 'TPFriendlist',
        layout: 'logged_in_base'
    });
});

// Topple profile post card list
router.get('/getSearchUsers', function(req, res, next) {
    axios.get(ToppleBackendServer + "TPSearch?q=" + req.query.q)
      .then(response => {
          res.render('searchcard', {
              users: response.data,
              layout: false
          });
      })
      .catch(error => {
        console.log(error);
      });
});

// Topple chat page
router.get('/chat', function(req, res, next) {
    axios.get(ToppleBackendServer + "TPUser?token=" + req.query.token)
      .then(response => {
          res.render('chat', {
              title: 'Message',
              friend_list_link: ToppleBackendServer + 'TPFriendlist',
              action_link_chat: "ws://" + ToppleBackendServerName + "TPChat",
              profile_user: req.query.profile_user,
              user_profile: response.data,
              layout: 'logged_in_base'
          });
      })
      .catch(error => {
        console.log(error);
      });

});

// Topple settings page
router.get('/settings', function(req, res, next) {
    res.render('settings', {
        title: 'Settings',
        friend_list_link: ToppleBackendServer + 'TPFriendlist',
        action_link_settings: ToppleBackendServer + 'TPSettings',
        user_profile_link: ToppleBackendServer + 'TPUser',
        layout: 'logged_in_base'
    });
});

// Topple post creation page
router.get('/post', function(req, res, next) {
    res.render('post', {
        title: 'Post',
        friend_list_link: ToppleBackendServer + 'TPFriendlist',
        action_link_post: ToppleBackendServer + 'TPPost',
        layout: 'logged_in_base'
    });
});

module.exports = router;
