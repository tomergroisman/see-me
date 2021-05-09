export default function Quote({reportValue}) {
  const quotesDic = {
    1: "איזה כיף שכיף",
    2: "איזה כיף שכיף",
    "-1": "הידעת? חשוב לשתף את המשפחה והחברים ברגשות שלך",
    "-2": "הידעת? חשוב לשתף את המשפחה והחברים ברגשות שלך",
  };
  return (
    <div style={{ fontSize: "24px", color: "lightgray" }}>
      &ldquo; {quotesDic[reportValue]} &rdquo;
    </div>
  );
}
