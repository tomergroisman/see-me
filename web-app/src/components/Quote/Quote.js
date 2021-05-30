export default function Quote({reportValue}) {
  const quotesDic = {
    1: "כיף לדעת שיש אנשים כמוך, תמשיך לדווח",
    2: "כיף לדעת שיש אנשים כמוך, תמשיך לדווח",
    "0": "זה לא מגיע לך או לאף אחד אחר",
    "-1": "זה לא מגיע לך או לאף אחד אחר",
    "-2": "זה לא מגיע לך או לאף אחד אחר",
  };
  return (
    <div style={{ fontSize: "24px", color: "lightgray" }}>
      &ldquo; {quotesDic[~~reportValue]} &rdquo;
    </div>
  );
}
