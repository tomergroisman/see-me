export default function Quote({reportValue}) {
  console.log("🚀 ~ file: Quote.js ~ line 2 ~ Quote ~ reportValue", reportValue)
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
