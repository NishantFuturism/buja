import Link from 'next/link';
const Contact = () => {
    return (
      <div style={{ padding: "3rem" }}>
        <h1>Contact Page</h1>
        <p>This is the contact page content.</p>
        <Link href="/">
            <p>Back</p>
          </Link>
      </div>
    );
  };
  
  export default Contact;