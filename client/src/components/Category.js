import React from 'react'
import CreateThread from './CreateThread'
import { Link } from 'react-router-dom'
import './Category.css'
import './CreateThread.css'
import { withRouter } from 'react-router'

// const url = 'http://localhost:3001'
const url = 'http://ensemble-ga.herokuapp.com'

class Category extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categoryId: this.props.match.params.id,
            threads: this.props.threads,
            filteredThreads: [],
            currentCategory: {id: null}
        }

    }

    getCategoryThreads = async () => {
        let currentId = parseInt(this.state.categoryId)
        const response = await fetch(url + '/thread')
        const data = await response.json()
        console.log(data)
        const filteredThreads = await data.filter(thread => {
            return thread.categoryId === currentId
        })
        this.setState({
            filteredThreads: filteredThreads
        })
    }

    getCurrentCategory = async () => {
        let currentId = parseInt(this.state.categoryId)
        const response = await fetch(url + '/category/' + currentId)
        const data = await response.json()
        this.setState({
            currentCategory: data.category
        })
    }

    componentDidMount() {
        this.getCategoryThreads()
        this.getCurrentCategory()
    }



    render() {
        console.log(this.props.threads)
        console.log(this.state.currentCategory)
        return (
            <div className='category_page'>

                <button className='back_button' onClick={this.props.history.goBack}>Go Back</button>

               {this.state.currentCategory.id &&
                    <h1 className='category_page_title'>{this.state.currentCategory.name}</h1>
                }
                <div className='category_section'>
                    <div className='category_container'>
                        <div className="category_thread_column">
                            {!!this.state.filteredThreads.length &&
                                this.state.filteredThreads.map(thread => (
                                    <div className='category_thread_container' key={thread.id}>
                                        <Link className='category_container_title' to={`/Thread/${thread.id}`} key={thread.id}>{thread.title}</Link>
                                        <p className='category_thread_author'>By: {!!this.props.users.length && this.props.users.find(user => user.id === thread.userId).name}</p>
                                        <p className='category_thread_created_on'>Created on: {new Date(thread.createdAt).toLocaleString()}</p>

                                    </div>
                                ))
                            }
                            {/* classes defined in CreateThread.css */}

                        </div>
                        {this.props.currentUser.id &&
                            <div className='create_new_thread_widget'>
                                <h3 className='create_new_thread_title'>Create a new thread</h3>
                                <CreateThread currentUser={this.props.currentUser} categoryId={this.state.categoryId} getCategoryThreads={this.getCategoryThreads} />
                            </div>
                        }

                    </div>

                </div>

            </div>
        )
    }
}

export default Category
