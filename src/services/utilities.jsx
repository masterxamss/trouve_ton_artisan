export function printStars(classification) { // ex: (4.8)
    // Total number of stars
    const totalStars = 5;

    // Number of full stars
    const fullStars = Math.floor(classification); // (4)

    // Verify if there is a half star
    const halfStar = classification % 1 >= 0.5 ? 1 : 0; // 1/true

    // Number of empty stars
    const emptyStars = totalStars - fullStars - halfStar; // 5 - 4 - 1 = 0

    let result = "⭐".repeat(fullStars); // Build a string of stars (4-⭐⭐⭐⭐)
    if (halfStar) {
      result += "⚝"; // ⭐⭐⭐⭐ + ⚝
    }
    result += "⚝".repeat(emptyStars); // ⭐⭐⭐⭐⚝ + 0

    return <span>{result}</span> // ⭐⭐⭐⭐⚝
  }