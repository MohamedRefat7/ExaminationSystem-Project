document.addEventListener("DOMContentLoaded", () => {
  const quotes = [
    "“Success is no accident. It is hard work, perseverance, and learning.”",
    "“Believe in yourself and all that you are.”",
    "“The secret to success is to start before you are ready.”",
    "“Don’t stop until you’re proud.”",
  ];

  const quoteElement = document.getElementById("quote");
  let index = 0;

  // Function to update the quote
  const updateQuote = () => {
    quoteElement.textContent = quotes[index];
    index = (index + 1) % quotes.length; // Loop back to the first quote
  };

  // Initial quote
  updateQuote();

  // Change quote every 30 seconds
  setInterval(updateQuote, 10000);
});
