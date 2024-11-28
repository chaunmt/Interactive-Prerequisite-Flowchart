/** utility function for reformatting plain text to the appropriate html tags */
export function reformat(input: string, combine_newlines?: boolean) {
  const lst = combine_newlines
    ? input.split("\n").filter((para) => para != "")
    : input.split("\n");
  return lst.map((para, i) => (
    <>
      <p key={i}>{para}</p>
      <br />
    </>
  ));
}

// I expect to write more of these later for converting data plaintext to html - jahndan, 2024-11-28
