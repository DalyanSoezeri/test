import React from "react";
import {
Box,
Container,
Row,
Column,
FooterLink,
Heading,
} from "./footerStyles.components.js";

const Footer = () => {
return (
	<Box>
	<h1 style={{ color: "blue",
				textAlign: "center",
				marginTop: "-50px" }}>
		TutorHub 
	</h1>
	<h1 style2={{ color: "blue",
				 }}>
		 
	</h1>
	<Container>
		<Row>
		<Column>
			<Heading>About Us</Heading>
			<FooterLink  >Aim</FooterLink>
			<FooterLink href="#" >Vision</FooterLink>
			<FooterLink href="#" >Testimonials</FooterLink>
		</Column>
		<Column>
			<Heading>Services</Heading>
			<FooterLink href="#">Writing</FooterLink>
			<FooterLink href="#">Internships</FooterLink>
			<FooterLink href="#">Coding</FooterLink>
			<FooterLink href="#">Teaching</FooterLink>
		</Column>
		<Column>
			<Heading>Legal</Heading>
			<FooterLink href="#">Sport</FooterLink>
			<FooterLink href="#">Help</FooterLink>
			<FooterLink href="#">Privacy</FooterLink>
			<FooterLink href="#">Terms</FooterLink>
		</Column>
		<Column>
			<Heading>Social Media</Heading>
			<FooterLink href="https://de-de.facebook.com/">
			<i className="fab fa-facebook-f">
				<span style={{ marginLeft: "10px" }}>
				Facebook
				</span>
			</i>
			</FooterLink>
			<FooterLink href="https://www.instagram.com/">
			<i className="fab fa-instagram">
				<span style={{ marginLeft: "10px" }}>
				Instagram
				</span>
			</i>
			</FooterLink>
			<FooterLink href="https://twitter.com/">
			<i className="fab fa-twitter">
				<span style={{ marginLeft: "10px" }}>
				Twitter
				</span>
			</i>
			</FooterLink>
			<FooterLink href="https://www.youtube.com/">
			<i className="fab fa-youtube">
				<span style={{ marginLeft: "10px" }}>
				Youtube
				</span>
			</i>
			</FooterLink>
		</Column>
		</Row>
	</Container>
	</Box>
);
};
export default Footer;
