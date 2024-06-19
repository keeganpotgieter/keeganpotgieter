export const about = async () => {
  return (
    <div className='flex flex-col gap-2'>
      <h1 className='text-xl'>Hi there! I am Keegan.</h1>
      <p>I love to build things.</p>

      <br></br>
      <span>
        🧑🏼‍💻 I am enthusiastic and self-motivated, passionate about personal
        development, investing, and data analysis.
      </span>
      <span>
        📚 First Class Software Engineering (Honours) at the University of
        Sydney.
      </span>
      <span>💻 Fluent in Python, Java, JS, TS, React, Node.js, and more.</span>
    </div>
  );
};
export const a = about;

about.description = 'About me';
