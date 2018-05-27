import React from 'react'
import {formatCurrency} from '../util/formatNumbers'
import collapseImg from '../assets/images/1x/icon_dropdown.png'
import DropDown from './dropdown/DropDown'
import LabelBook from '../components/LabelBook'

function LabelText(props) {
	const label = props.label;
	const text = props.text;
	 
	return (
		<div>
			<span className="labelprice">{label}</span>
			<span className="price">{text}</span>
		</div>
	);
}

function LabelPrice(props) {
	const label = props.label;
	const fieldPrice = props.fieldPrice;
	 
	return (
		<LabelText label={label} text={fieldPrice} />
	);
}

const Header2 = ({ bookSelected, books, ticker, selectBook, exchange }) => {
	const exchangeCurrency = bookSelected.toUpperCase().split('_');
	const formatBook = exchangeCurrency.join('/');
	const media = (ticker.high-ticker.low)/2 + ticker.low;
	const variation = (ticker.last * 100)/media;
	const variatoinFix = variation.toFixed(2);
	const sign = ticker.last > media ? "+" : "";
	const percent = ((ticker.last - media) * 100)/ticker.last;
	const percentFix  = percent.toFixed(2);
	
	const itemsMenu = books.map(book=>{
		return {
			label: book.book.toUpperCase().split('_').join('/'),
			value: book.book,
			previousValue: bookSelected,
			action: selectBook,
			className: book.book == bookSelected ? "selected select active": ""
		}
	});
	
	return (
		<ul className="header2-menu">
			<li className="vcenter title" >
				<DropDown items={itemsMenu}>
					<span className="greenText">{formatBook}  <img src={collapseImg} /></span>
				</DropDown>
			</li>
			<li className="vcenter volumen">
				<LabelPrice label={"Volumen 24 hrs. "} fieldPrice={formatCurrency(ticker.volume, exchangeCurrency[0])}/>
			</li>
			<li className="vcenter max">
				<LabelPrice label={"Max. "} fieldPrice={formatCurrency(ticker.high, exchangeCurrency[1])} />
			</li>
			<li className="vcenter min">
				<LabelPrice label={"Min. "} fieldPrice={formatCurrency(ticker.low, exchangeCurrency[1])}/>
			</li>
			<li className="vcenter variation">
				<LabelText label={"Variación "} text={sign + formatCurrency(variation, exchangeCurrency[1]) + ' (' +  percentFix + '%)'} />
			</li>
			<li className="vcenter floatRight exchangevalue">
				<LabelBook exchange={exchange} bookSelected={bookSelected} />
			</li>
		</ul>
	);
}
export default Header2