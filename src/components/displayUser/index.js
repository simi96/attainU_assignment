import React from 'react'
import ReactPaginate from 'react-paginate';
import  {formatDateOfBirth}  from "../../constants";
import './index.css';

export default class DisplayUser extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            users: []
        }
        this.pageCount = 100
    }

    componentDidMount() {
        this.fetchUsers()
    }


    fetchUsers = async () =>  {
        let url = 'http://localhost:5000/users'
        let response = await fetch(url);
        this.masterData = await response.json();
        this.totalPages = this.masterData.length/ this.pageCount
        const slicedArr = this.masterData.slice(0, this.pageCount)
        this.updateState(slicedArr)
    }


    debounce (func, timeout = 1000) {
        let timer;
        return () => {
            clearTimeout(timer)
            timer = setTimeout(() => { func() }, timeout)
        }
    }

    handlePageChange = (e) => {
        const slicedArr = this.masterData.slice(this.pageCount*e.selected, this.pageCount*e.selected + this.pageCount)
       this.updateState(slicedArr)
    }

    handleOnChange = (e) => {
        this.text = e.target.value
        if(!this.text)
        {
            const slicedArr = this.masterData.slice(0, this.pageCount)
            this.updateState(slicedArr)
            return
        }
        this.debounce(() => {
            let filteredArr = this.masterData.filter( item => item['Full Name'].toLowerCase().includes(this.text))
            this.updateState(filteredArr)
        })()
    }

    updateState = (slicedArr) => {
        const users =  slicedArr.map(item => {
            return (
                <ul>
                    <li>Name: {item['Full Name']}</li>
                    <li>Email: {item.Email}</li>
                    <li>Date of Birth: {formatDateOfBirth(item['Date of birth'])}</li>
                    <li>Country: {item.Country}</li>
                </ul>
            )
        })
        this.setState({
            users
        })
    }

    render() {
        return (
            <div>
                { <input type = 'text' placeholder = 'Search..' onChange = {(e) => this.handleOnChange(e)} style = {{margin: 'auto', display: 'block'}}/> }
                <div className = 'flex-container'>
                     {this.state.users}
                </div>
           <ReactPaginate containerClassName = {'pagination'} previousLabel = {'prev'} nextLabel = {'next'} breakLabel={'...'} pageRangeDisplayed = {5} marginPagesDisplayed = {2} subContainerClassName={"pages pagination"}
            activeClassName={"active"}  pageCount = {this.totalPages} onPageChange = {(e) => this.handlePageChange(e)} />
           </div>
        )
    }
}