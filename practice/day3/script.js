// Starting data
let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

// 1. searchNotes(word)
function searchNotes(word) {
  const query = word.toLowerCase();
  return notes.filter((note) => note.text.toLowerCase().includes(query));
}

// 2. longestNote()
function longestNote() {
  if (notes.length === 0) return null;
  let longest = notes[0];
  for (let i = 1; i < notes.length; i++) {
    if (notes[i].text.length > longest.text.length) {
      longest = notes[i];
    }
  }
  return longest;
}

// 3. countByCategory()
function countByCategory() {
  const counts = { personal: 0, work: 0, study: 0 };
  notes.forEach((note) => {
    if (counts[note.category] !== undefined) {
      counts[note.category]++;
    } else {
      counts[note.category] = 1;
    }
  });
  return counts;
}

// 4. getSummary()
function getSummary() {
  const counts = countByCategory();
  const total = notes.length;
  const noteWord = total === 1 ? "note" : "notes";
  return `${total} ${noteWord}: ${counts.personal} personal, ${counts.work} work, ${counts.study} study.`;
}

// 5. isDuplicate(text)
function isDuplicate(text) {
  const cleanedText = text.trim().toLowerCase();
  return notes.some((note) => note.text.trim().toLowerCase() === cleanedText);
}

// 6. addNote(text, category)
const VALID_CATEGORIES = ["personal", "work", "study"];

function addNote(text, category) {
  const trimmedText = text ? text.trim() : "";

  if (trimmedText.length < 1 || trimmedText.length > 200) {
    console.log("❌ Rejected: Note must be between 1 and 200 characters.");
    return false;
  }
  if (!VALID_CATEGORIES.includes(category)) {
    console.log("❌ Rejected: Invalid category. Must be personal, work, or study.");
    return false;
  }
  if (isDuplicate(trimmedText)) {
    console.log("❌ Rejected: Note is a duplicate.");
    return false;
  }

  const newNote = {
    id: Date.now(),
    text: trimmedText,
    category: category,
  };
  notes.push(newNote);
  console.log(`✅ Added note: "${trimmedText}" (${category})`);
  return true;
}

// --- Tests & Console Logs ---

// 1. searchNotes tests
console.log(searchNotes("assignment")); 
// Expected: [ { id: 2, text: "Finish the Day 3 assignment", category: "study" }, { id: 4, text: "Revise JavaScript arrays", category: "study" } ]

console.log(searchNotes("spaceship")); 
// Expected: []


// 2. longestNote tests
console.log(longestNote()); 
// Expected: { id: 3, text: "Email the project report to Grace", category: "work" }

// Edge case for empty notes array test
let backupNotes = notes;
notes = [];
console.log(longestNote()); 
// Expected: null
notes = backupNotes; // restore


// 3. countByCategory tests
console.log(countByCategory()); 
// Expected: { personal: 2, work: 1, study: 2 }

// Edge case test with modified array
notes = [{ id: 1, text: "Single note", category: "personal" }];
console.log(countByCategory()); 
// Expected: { personal: 1, work: 0, study: 0 }
notes = backupNotes; // restore


// 4. getSummary tests
console.log(getSummary()); 
// Expected: "5 notes: 2 personal, 1 work, 2 study."

// Edge case test with single note
notes = [{ id: 1, text: "Only one", category: "work" }];
console.log(getSummary()); 
// Expected: "1 note: 0 personal, 1 work, 0 study."
notes = backupNotes; // restore


// 5. isDuplicate tests
console.log(isDuplicate("buy milk and bread")); 
// Expected: true (ignoring case/spaces)

console.log(isDuplicate("Learn Python")); 
// Expected: false


// 6. addNote tests
addNote("Go for a run", "personal"); 
// Expected: ✅ Added note: "Go for a run" (personal) & returns true

addNote("   ", "personal"); 
// Expected: ❌ Rejected: Note must be between 1 and 200 characters. & returns false 