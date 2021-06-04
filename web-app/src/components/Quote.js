export default function Quote({ reportValue }) {
  const quotesDic = {
    2: "כיף לשמוע! תמשיך להפיץ טוב ברשת",
    1: "עשה רק טוב והטוב יגיד אליך בחזרה?",
    "0": "זה לא מגיע לך או לאף אחד אחר",
    "-1": "זה לא מגיע לך או לאף אחד אחר",
    "-2": "לא לפחד לגשת לקבל עזרה, לפעמים לשתף יכול להקל על ההרגשה שלך "
  };
  return (
    <div style={{ fontSize: "32px", color: "black" }}>
      {/* &ldquo;  */}
      {quotesDic[~~reportValue]}
      {/* &rdquo; */}
    </div>
  );
}
