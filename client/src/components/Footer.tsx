import { Footer } from 'flowbite-react';

export default function FooterCom() {
  return (
    <Footer container className="border-t-2 ">
      <Footer.Copyright href="#" by="Expenses Tracker" year={2024} />
      <Footer.LinkGroup>
        <Footer.Link href="/about">About</Footer.Link>
        <Footer.Link href="#">Github</Footer.Link>
        <Footer.Link href="#">Discord</Footer.Link>
        <Footer.Link href="#">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}
