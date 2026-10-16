import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { useColorMode } from '@docusaurus/theme-common';



const FeatureList = [
	{
		title: 'NUI',
		Svg: require('@site/static/img/NUI-logo.svg').default,
		description: (
			<>
				Il progetto da cui poi ho derivato Jack
			</>
		),
		onClick: () => window.open("https://demo.natsnui.app/")
	},
];

function Feature({ Svg, title, description, onClick }) {
	const { colorMode } = useColorMode();

	return (
		<div
			className={clsx('col col--4')}
			style={{ cursor: "pointer" }}
			onClick={onClick}
		>
			<div className="text--center">
				<Svg className={styles.featureSvg} role="img" />
			</div>
			<div className="text--center padding-horiz--md">
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
		</div>
	);
}

export default function HomepageFeatures() {
	return (
		<section
			className={styles.features}
			style={{ backgroundColor: "#823505" }}
		>
			<div className="container">
				<div
					className="row"
					style={{ justifyContent: "center" }}
				>
					{FeatureList.map((props, idx) => (
						<Feature key={idx} {...props} />
					))}
				</div>
			</div>
		</section>
	);
}
