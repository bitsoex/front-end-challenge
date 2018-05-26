import { formatNumber, priceFormat } from '../../_/util';
import { CustomTable } from '../../_/elements';

function parseData(payload) {
  return payload.map(item => ({
    key: item.tid,
    side: item.maker_side,
    time: moment(item.created_at).format('H:mm:ss'),
    price: formatNumber(item.book, item.price),
    amount: priceFormat(item.amount),
  }));
}

function fetchData(book) {
  return fetch(`https://api.bitso.com/v3/trades/?book=${book}`)
    .then(resp => resp.json())
    .then(data => parseData(data.payload));
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    fetchData('btc_mxn')
      .then(result => {
        this.setState({
          trades: result,
          loading: false,
        });
      });
  }

  render() {
    const { loading, trades } = this.state;

    return (
      <CustomTable
        fields={[
          { key: 'time', label: 'Hora', align: 'left' },
          { key: 'price', label: 'Precio', align: 'right', classes: 'coin mxn' },
          { key: 'amount', label: 'Monto', align: 'right', classes: 'coin btc' },
        ]}
        caption='Últimos trades'
        isLoading={loading}
        data={trades}
      />
    );
  }
}
