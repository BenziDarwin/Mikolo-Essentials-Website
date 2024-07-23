import { useState } from 'react';
import emailjs from 'emailjs-com';
import { markdownify } from "@lib/utils/textConverter";

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title, info } = frontmatter;

  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
 
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const result = await emailjs.sendForm(
        'service_nxa3jkn',
        'template_ssw4zl7', 
        "#myForm",
        "txCjOxKGAON-6HA1v"
      );

      console.log('Message sent:', result.text);
      setStatus('Your message has been sent successfully!');
      setLoading(false);
      window.location.reload();

    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('There was an error sending your message. Please try again later.');
      setLoading(false)
    }
  };

  return (
    <section className="section">
      <div className="container">
        {markdownify(title, "h1", "text-center font-normal")}
        <div className="section row pb-0">
          <div className="col-12 md:col-6 lg:col-7">
            <form id="myForm" className="contact-form" onSubmit={submitHandler}>
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="name"
                  type="text"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="email"
                  type="email"
                  placeholder="Your email"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  name="message"
                  className="form-textarea w-full rounded-md"
                  rows="7"
                  placeholder="Your message"
                  required
                /> 
              </div>
              <button disabled={loading} type="submit" className="btn btn-primary">
                Send Now
              </button>
              {status && <p className="mt-4 text-green-500">{status}</p>}
            </form>
          </div>
          <div className="content col-12 md:col-6 lg:col-5">
            {markdownify(info.title, "h4")}
            {markdownify(info.description, "p", "mt-4")}
            <ul className="contact-list mt-5">
              {info.contacts.map((contact, index) => (
                <li key={index}>
                  {markdownify(contact, "strong", "text-dark")}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
