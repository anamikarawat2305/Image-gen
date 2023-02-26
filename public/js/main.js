function onSubmit(e) {
  e.preventDefault();

  // Clear any previous error messages and image from DOM elements by their class attribute value (msg, image)
  // and assign them to variables msg and image respectively (not used in this function)   
  document.querySelector('.msg').textContent = '';
  document.querySelector('#image').src = '';

  // Get form values from DOM elements by their id attribute value (prompt, size)
  // and assign them to variables prompt and size
  const prompt = document.querySelector('#prompt').value;
  const size = document.querySelector('#size').value;

  // If prompt is empty, show alert and return from function to prevent further execution 
  if (prompt === '') {
    alert('Please add some text to the prompt');
    return;
  }
  
// Call generateImageRequest function with prompt and size as arguments 
  generateImageRequest(prompt, size);
}

// Declare async function generateImageRequest with prompt and size as parameters 
async function generateImageRequest(prompt, size) {
  try {
// Call showSpinner function to show spinner 
    showSpinner();

// Declare response variable and assign it to the result of calling fetch function with '/openai/generateimage' as argument
    const response = await fetch('/openai/generateimage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });
// If response is not ok, call removeSpinner function to remove spinner and throw new error
    if (!response.ok) {
      removeSpinner();
      throw new Error('That image could not be generated');
    }

// Declare data variable and assign it to the result of calling response.json function 
    const data = await response.json();
    // console.log(data);

// Declare imageUrl variable and assign it to the data.data property of data variable
// To show the image in the site/DOM
    const imageUrl = data.data;

// Assign imageUrl to the src attribute of DOM element with id attribute value of image 
    document.querySelector('#image').src = imageUrl;

    removeSpinner();
  } catch (error) {
// If error, assign error message to the textContent attribute of DOM element with class attribute value of msg
    document.querySelector('.msg').textContent = error;
  }
}

// Declare function showSpinner to add class of show to DOM element with class attribute value of spinner
function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

// Add event listener to DOM element with id attribute value of image-form
document.querySelector('#image-form').addEventListener('submit', onSubmit);
