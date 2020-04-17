// Declare variables to hold twitter API url and user name
var twitter_api_url = 'http://search.twitter.com/search.json';
var keyword = 'covid';
var tweet_limit = 3;

// Enable caching
$.ajaxSetup({ cache: true });

/* The returned JSON object will have a property called "results" where we find
*	a list of the tweets matching our request query
*/

$.getJSON(
    twitter_api_url + '?callback=?&rpp=' + tweet_limit + '&q=%23' + keyword,
    /* ------ grabs 3 latest tweets where searched for #keyword (#hashtag) -------- */

    //twitter_api_url + '?callback=?&rpp=' + tweet_limit + '&q=%40' + keyword,
    /* ------ grabs 3 latest tweets where searched for @keyword (@username) -------- */

    //twitter_api_url + '?callback=?&rpp=' + tweet_limit + '&q=' + keyword,
    /* ------ grabs 3 latest tweets where searched for raw keyword (keyword) - Might get some foreign tweets this way -------- */

    function(data){
        $.each(data.results, function(i, tweet){
        // Uncomment line below to show tweet data in Fire Bug console
        // Very helpful to find out what is available in the tweet objects
        console.log('tweets',tweet);

        // Before we continue we check that we got data
            if(tweet.text !== undefined){

                // Calculate how many hours ago was the tweet posted
                var date_tweet	=	new Date(tweet.created_at);
                var date_now	=	new Date();
                var date_diff	=	date_now - date_tweet;
                var hours		=	Math.round(date_diff/(1000*60*60));
                var user_url	=	'<a href="http://www.twitter.com/'+keyword+'/status/'+tweet.id+'">'+'@'+ keyword+'<\/a>';
                var text_string =	tweet.text;

                var username_text_string	=	text_string.replace('@'+keyword, '<span class="tweet-tag">@'+keyword+'<\/span>'); // *Use one of these variables below
                var hash_text_string		=	text_string.replace('#'+keyword, '<span class="tweet-tag">#'+keyword+'<\/span>'); // *Use one of these variables below
                var user_avatar				=	tweet.profile_image_url;
                var user_name				=	tweet.from_user_name;

                // Build the html string for the current tweet
                var tweet_html	=	'<div class="tweet-item">';
                tweet_html		+=	'<img src="' + user_avatar + '" alt="Twitter User ' + user_name + '\'s Avatar">';
                tweet_html		+=	'<div class="tweet-text">';
                tweet_html		+=	'<a href="http://www.twitter.com/';
                tweet_html		+=	keyword + '/status/' + tweet.id + '">';
                tweet_html		+=	hash_text_string + '<\/a> '; // *Replace the variable here based on how you're searching
                tweet_html		+=	' hours ago<\/span><\/div><\/div>';
                /*
                You can grab other stuff from the Object, like these:
                created_at:
                from_user:
                from_user_id:
                from_user_id_str:
                from_user_name:
                geo:
                id:
                id_str:
                iso_language_code:
                profile_image_url:
                profile_image_url_https:
                source:
                text:
                to_user:
                to_user_id:
                to_user_id_str:
                to_user_name:
                More on that here: https://dev.twitter.com/docs/using-search
                */

                // Append html string to tweet_container div
                $('#tweets').append(tweet_html);
            }
        });
    }
);