import Link from 'next/link';
const About = () => {
    return (
      <div style={{ padding: "3rem" }}>
        <h1>About Page</h1>
        <p>This is the about page content.</p>
        <Link href="/">
            <p>Back</p>
          </Link>
      </div>
    );
  };
  
export default About;