import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
const About = () => {
	return (
		<Fragment>
			<section className="about-page">
				<h1>About</h1>
				<article className="article">
					<h2>Overview</h2>
					<p>
						An app that simulates ordering food and claiming it from restaurant anywhere and anytime.
						imagine, you want to order something from a restaurant but you are not comfortable taking the
						line or you want your order to be served once you arrived at the said restaurant to avoid taking
						the line or queue.
					</p>
				</article>
				<h2>How it works</h2>
				<article className="article">
					<aside className="aside">
						<h3>Customers:</h3>
						<ol>
							<li>No login required; Just take orders.</li>
							<li>You can use this app to take the orders listed by the restaurant.</li>
							<li>
								After ordering, the app will generate/download a stub for you to present this once you
								are in the restaurant.
							</li>
							<li>
								Then when you reach the organization, show the claim stub to one of the staff and check
								for the progress of the order.
							</li>
							<li>
								Once the order is ready, you can pay the total amount of your orders and decide if you
								want to dine in or take out.
							</li>
							<li>Enjoy the meal.</li>
						</ol>
					</aside>

					<aside className="aside">
						<h3>Staff/Admin:</h3>
						<ol>
							<li>You can login to add and update your orders/categories.</li>
							<li>
								After registering new menu with it's corresponding categories, it will appear
								automatically to menu section.
							</li>
							<li>
								Aside from registering, you can also update some of the menus, categories and prices in
								case of unwanted events.
							</li>
							<li>
								You can also delete some of the menus in case if the menu on that day is not available.
							</li>
							<li>Additionally, Admin can only register new staff in the app.</li>
						</ol>
					</aside>
				</article>
				<h2>Specifications</h2>
				<article className="article">
					<div className="about-specs">
						<ul>
							<li>
								<strong>
									<h4>Design:</h4>
								</strong>
							</li>
							<li>Adobe Illustrator</li>
						</ul>

						<ul>
							<strong>
								<h4>Development:</h4>
							</strong>
							<li>HTML</li>
							<li>CSS</li>
							<li>Bootstrap 4</li>
							<li>React-Redux</li>
							<li>MongoDB</li>
							<li>Javascript</li>
							<li>React Js</li>
							<li>Node Js</li>
							<li>Express Js</li>
						</ul>
						<ul>
							<h4>Others:</h4>
							<li>html-pdf converter</li>
						</ul>
					</div>
				</article>

				<Link to="/">
					<button className="btn-wrapper-border">Back</button>
				</Link>
			</section>
		</Fragment>
	);
};

export default About;
