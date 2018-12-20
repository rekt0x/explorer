import React, { Component } from 'react';
import Header from 'views/components/header/header';
import Footer from 'views/components/footer/footer';
import TransactionHeader from '../components/header/tranactionBlockHeader';
import SearchBar from '../components/search/searchBar/index';
import TitleIcon from '../../images/icons/latest-blocks.svg';
import TxBlockPagination from '../containers/pagination/txBlockPagination';
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

class Wrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  isValidHash(hash) {
    const validHashLength = 66;
    if (hash && hash.length === validHashLength) {
      return { isValid: true, type: 'hash' };
    } else if (/^\d+$/.test(hash)) {
      return { isValid: true, type: 'number' };
    }
    return { isValid: false };
  }

  searchHandler(e) {
    e.preventDefault();
    // this.props.searchHandler(e)
    console.log('searchHandler');
    const { searchText } = this.props;

    if (searchText && searchText !== '') {
      const { isValid, type } = this.isValidHash(searchText);
      if (isValid) {
        this.setState({ isSearchActive: true });

        if (type === 'number') {
          this.props.history.push({
            pathname: `/blocks/${searchText}`,
          });
          // this.getFantomBlocks(searchText);
        } else if (type === 'hash') {
          this.props.history.push({
            pathname: `/transactions/${searchText}`,
          });
          // this.getFantomTransactionsFromApiAsync(searchText);
        }
      } else {
        // alert('Please enter valid block number or transaction hash.');
        this.toggle();

        // this.setState({
        //   blockData: [],
        //   error: 'Please enter valid hash.',
        //   isSearch: true,
        // });
      }
    } else {
      // this.setState({
      //   blockData: [],
      //   error: '',
      //   isSearch: false,
      // });
    }
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    return (
      <React.Fragment>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Error</ModalHeader>
          <ModalBody>
            Invalid Block Number or Transaction Hash. Please enter a valid Block
            Number or Transaction Hash.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              OK
            </Button>{' '}
          </ModalFooter>
        </Modal>

        <Header />
        <SearchBar
          searchHandler={(e) => {
            this.searchHandler(e);
          }}
          setSearchText={(e) => this.props.setSearchText(e)}
          searchText={this.props.searchText}
          placeHolder={this.props.placeHolder}
        />
        <section className="bg-theme full-height-conatainer">
          <Container>
            <TransactionHeader
              onChangePage={this.props.onChangePage}
              icon={TitleIcon}
              title={this.props.title}
              block={this.props.block}
              total={this.props.total}
              isSearching={this.props.isSearching}
              onShowList={this.props.onShowList}
              currentPage={this.props.currentPage}
              isRoute={this.props.isRoute}
            />
            {this.props.children}
            {!this.props.isSearching && !this.props.isRoute ? (
              <TxBlockPagination
                onChangePage={this.props.onChangePage}
                isSearching={this.props.isSearch}
                currentPage={this.props.currentPage}
              />
            ) : null}
          </Container>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}
export default Wrapper;
