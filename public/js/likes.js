class Post {
    constructor(id,body) {
        this.id = id;
        this.body = body;
        this.likeButton = this.body.querySelector("#like-button");
        this.counter = this.body.querySelector("#like-counter");
        this.syncState();
    }

    syncState() {
        if(this.likeButton.innerText === "Like") {
            this.liked = false;
            return;
        }
        this.liked = true;
    }

    like() {
        this.likeButton.innerText = "Unlike";
        this.liked = true;
        this.counter.innerText = parseInt(this.counter.innerText) + 1;
    }

    unlike() {
        this.likeButton.innerText = "Like";
        this.liked = false;
        this.counter.innerText = parseInt(this.counter.innerText) - 1;
    }
}

class Posts {
    constructor() {
        // retrieve posts
        let posts = document.querySelectorAll(".post");

        // initialize all as Post class and make an array
        this.initializeArray(posts)
        this.addLikeFunctionality();
    }

    initializeArray(posts) {
        this.posts = [];
        for(let post of posts) {
            this.posts.push(new Post(post.id, post));
        }
    }

    addLikeFunctionality() {
        for (let post of this.posts) {

            post.body.querySelector("#like-form").onsubmit = e => {
                // don't redirect
                e.preventDefault();

                // send like request to server
                if(post.liked) {
                    sendLikeRequest(post, "DELETE");
                    post.unlike();
                } else {
                    sendLikeRequest(post, "POST");
                    post.like();
                }
            };
        }
    }
}

function sendLikeRequest(post, method) {
    // get csrf token
    let csrf_token = post.body.querySelector("input[type='hidden']").value;

    fetch(`/posts/${post.id}/likes`, {
        method: method,
        headers: {
          "X-CSRF-TOKEN": csrf_token
        },
        credentials: "include",
        body: JSON.stringify({
            id: post.id
        })
    })
        .then(response => response.json())
        .then(response => {
            console.log(response);
        });
}

let posts = new Posts();
