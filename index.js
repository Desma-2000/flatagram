document.addEventListener("DOMContentLoaded", function () {
  // Make a GET request to retrieve image data
  fetch("/images/1")
    .then(response => response.json())
    .then(data => {
      // Update HTML elements with received data
      document.getElementById("card-title").textContent = data.title;
      document.getElementById("card-image").src = data.image;
      document.getElementById("like-count").textContent = data.likes + " likes";

      // Update comments list
      const commentsList = document.getElementById("comments-list");
      commentsList.innerHTML = ""; // Clear existing comments
      data.comments.forEach(comment => {
        const li = document.createElement("li");
        li.textContent = comment.content;
        commentsList.appendChild(li);
      });
    })
    .catch(error => {
      console.error("Error fetching image data:", error);
    });
});
  // Function to handle increasing likes
  function increaseLikes() {
    const likeCountElement = document.getElementById("like-count");
    const currentLikes = parseInt(likeCountElement.textContent, 10);
    likeCountElement.textContent = (currentLikes + 1) + " likes";
  }

  // Function to handle adding a new comment
  function addComment(event) {
    event.preventDefault(); // Prevent default form submission behavior
    const commentInput = document.getElementById("comment");
    const commentContent = commentInput.value.trim(); // Get the comment content
    if (commentContent !== "") { // Ensure comment is not empty
      const commentsList = document.getElementById("comments-list");
      const li = document.createElement("li");
      li.textContent = commentContent;
      commentsList.appendChild(li);
      commentInput.value = ""; // Clear the comment input field
    }
  }

  // Event listener for the like button
  document.getElementById("like-button").addEventListener("click", function () {
    increaseLikes();
  });

  // Event listener for the comment form
  document.getElementById("comment-form").addEventListener("submit", function (event) {
    addComment(event);
  });

  // Fetch image data and comments when the page loads (assuming this part of the code was already provided)
  fetch("/images/1")
    .then(response => response.json())
    .then(data => {
      document.getElementById("card-title").textContent = data.title;
      document.getElementById("card-image").src = data.image;
      document.getElementById("like-count").textContent = data.likes + " likes";

      const commentsList = document.getElementById("comments-list");
      commentsList.innerHTML = "";
      data.comments.forEach(comment => {
        const li = document.createElement("li");
        li.textContent = comment.content;
        commentsList.appendChild(li);
      });
    })
    .catch(error => {
      console.error("Error fetching image data:", error);
    });
    // Function to handle removing a comment
  function removeComment(event) {
    const clickedComment = event.target;
    clickedComment.parentNode.removeChild(clickedComment);
  }

  // Function to toggle image visibility
  function toggleImageVisibility() {
    const imageElement = document.getElementById("card-image");
    imageElement.classList.toggle("hidden");
  }

  // Function to fetch and update image with a random dog image
  function getRandomDogImage() {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then(response => response.json())
      .then(data => {
        const imageUrl = data.message;
        const imageElement = document.getElementById("card-image");
        imageElement.src = imageUrl;
      })
      .catch(error => {
        console.error("Error fetching random dog image:", error);
      });}
    

    // Event listener for removing a comment
    document.getElementById("comments-list").addEventListener("click", function (event) {
      if (event.target.tagName === "LI") {
        removeComment(event);
      }
    });
  
    // Event listener for toggling image visibility
    document.getElementById("card-title").addEventListener("click", function () {
      toggleImageVisibility();
    });
  
    // Event listener for fetching and updating image with a random dog image
    document.getElementById("card-image").addEventListener("click", function () {
      getRandomDogImage();
    });
  
    // Fetch initial image data (assuming this part of the code was already provided)
    fetch("/images/1")
      .then(response => response.json())
      .then(data => {
        document.getElementById("card-title").textContent = data.title;
        document.getElementById("card-image").src = data.image;
        document.getElementById("like-count").textContent = data.likes + " likes";
  
        const commentsList = document.getElementById("comments-list");
        commentsList.innerHTML = "";
        data.comments.forEach(comment => {
          const li = document.createElement("li");
          li.textContent = comment.content;
          commentsList.appendChild(li);
        });
      })
      .catch(error => {
        console.error("Error fetching image data:", error);
      });
      document.addEventListener("DOMContentLoaded", function () {
        // Function to handle removing a comment
        function removeComment(event) {
          const clickedComment = event.target;
          const commentId = clickedComment.dataset.commentId; // Retrieve the comment ID
          clickedComment.parentNode.removeChild(clickedComment);
      
          // Send DELETE request to remove the comment from the server
          fetch(`/comments/${commentId}`, {
            method: "DELETE"
          })
          .catch(error => {
            console.error("Error deleting comment:", error);
          });
        }
      
        // Function to handle adding a new comment
        function addComment(event) {
          event.preventDefault(); // Prevent default form submission behavior
          const commentInput = document.getElementById("comment");
          const commentContent = commentInput.value.trim(); // Get the comment content
          if (commentContent !== "") { // Ensure comment is not empty
            const commentsList = document.getElementById("comments-list");
            const li = document.createElement("li");
            li.textContent = commentContent;
            commentsList.appendChild(li);
            commentInput.value = ""; // Clear the comment input field
      
            // Send POST request to add the comment to the server
            fetch("/comments", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                imageId: 1, // Assuming imageId is 1 for the example
                content: commentContent
              })
            })
            .catch(error => {
              console.error("Error adding comment:", error);
            });
          }
        }
      
        // Function to fetch and update image with a random dog image
        function getRandomDogImage() {
          fetch("https://dog.ceo/api/breeds/image/random")
            .then(response => response.json())
            .then(data => {
              const imageUrl = data.message;
              const imageElement = document.getElementById("card-image");
              imageElement.src = imageUrl;
      
              // Send PATCH request to update the image URL on the server
              fetch("/images/1", {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  image: imageUrl
                })
              })
              .catch(error => {
                console.error("Error updating image:", error);
              });
            })
            .catch(error => {
              console.error("Error fetching random dog image:", error);
            });
        }
      
        // Event listener for removing a comment
        document.getElementById("comments-list").addEventListener("click", function (event) {
          if (event.target.tagName === "LI") {
            removeComment(event);
          }
        });
      
        // Event listener for adding a new comment
        document.getElementById("comment-form").addEventListener("submit", function (event) {
          addComment(event);
        });
      
        // Event listener for fetching and updating image with a random dog image
        document.getElementById("card-image").addEventListener("click", function () {
          getRandomDogImage();
        });
      
        // Fetch initial image data (assuming this part of the code was already provided)
        fetch("/images/1")
          .then(response => response.json())
          .then(data => {
            document.getElementById("card-title").textContent = data.title;
            document.getElementById("card-image").src = data.image;
            document.getElementById("like-count").textContent = data.likes + " likes";
      
            const commentsList = document.getElementById("comments-list");
            commentsList.innerHTML = "";
            data.comments.forEach(comment => {
              const li = document.createElement("li");
              li.textContent = comment.content;
              li.dataset.commentId = comment.id; // Set the comment ID as a data attribute
              commentsList.appendChild(li);
            });
          })
          .catch(error => {
            console.error("Error fetching image data:", error);
          });
      });
      
  
  
