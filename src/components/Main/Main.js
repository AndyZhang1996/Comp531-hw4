import React, { Component } from 'react'
import User from './User.js'
import Friend from './Friend.js'
import Post from './Post.js'
import { Container } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import {Redirect} from 'react-router-dom'


export class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userId: localStorage.getItem("userId"),             //id of the user who logged in
            userName: "",          //name of the currently logged-in user 
            users: "",             //information of all users 
            posts: "",             //information of all posts
            status: "",            //status of the logged in user
            friendsList: [],        //list of ids of all the friends of the logged-in user 
            friends: [],           //list of all the friends including three initial friends and added friends later
            newFriendName: "",      //the new friend name
            userPosts: [],           //posts of the logged-in user 
            timeStamp: 0,             //timestamp of the post, add 1 when posting a new post 
            newPost: "",               //new post the user tries to post
            searchPost: "",             //post that is searched in the search box
            filteredPosts: ""           //posts after search 
            // array: [1, 2, 3]

        }

        this.change = this.change.bind(this)
        this.addFriend = this.addFriend.bind(this)
        this.getUserName = this.getUserName.bind(this)
    }

    componentDidMount = () => {
        console.log('ok')
        //if(!localStorage.getItem('userId')) return
        this.fetchPosts()
        this.fetchUsers()
    }




    getUserFriendIds = () => {
        let tempArray = []
        let i
        for (i = 1; i < 4; i++) {
            let temp = this.state.userId + i
            if (temp != 10) {
                temp = temp % 10
            }
            tempArray.push(temp)
        }
        this.setState({ friendsList: tempArray })
    }





    // checkUserFriends = (user) => {
    //     if (user.id === 1 || user.id === 2 || user.id === 3){
    //         return user
    //     }
    // }

    // getUserFriends = () => {
    //     console.log(this.state.users)
    //     let tempArray = this.state.users.filter(this.checkUserFriends)
    //     this.setState({friends: tempArray})
    // }




    fetchUsers = async () => {
        let id = this.state.userId - 1
        const returned = await fetch(
            'https://jsonplaceholder.typicode.com/users'
        );
        const items = await returned.json()

        // this.setState({ users: items }, () => {
        //     (() => { this.setState({ status: this.state.users[id].company.catchPhrase } )()
        //     (() => { this.getUserFriends })()
        // })})


        this.setState({ users: items }, () =>
            this.setState({ status: this.state.users[id].company.catchPhrase }))



        // console.log(typeof this.state.data)
        // console.log(this.state.data[0].id)
        console.log(this.state.users)
        // console.log(this.state.data[0].address.street)
        // console.log(this.state.users[0].username)

        this.getUserName()
        this.fetchFriends()
    }

    getUserName = () => {
        this.setState({ userName: this.state.users[this.state.userId - 1].username })
    }


    fetchFriends = async () => {
        const returned = await fetch(
            'https://jsonplaceholder.typicode.com/users'
        );
        const items = await returned.json()

        this.getUserFriendIds()
        let userFriends = this.state.users.map((user) => {
            if (user.id === this.state.friendsList[0] || user.id === this.state.friendsList[1] || user.id === this.state.friendsList[2]) {
                return user
            }
        })
        let updatedUserFriends = []
        for (let i = 0; i < userFriends.length; i++) {
            if (userFriends[i] != null) {
                updatedUserFriends.push(userFriends[i])
            }
            // userFriends[i] ? updatedUserFriends.push(userFriends[i]) : ''
        }

        this.setState({ friends: updatedUserFriends })

    }


    fetchPosts = async () => {
        const returned = await fetch(
            'https://jsonplaceholder.typicode.com/posts'
        );
        const items = await returned.json()
        this.setState({ posts: items })
        // console.log(typeof this.state.data)
        // console.log(this.state.data[0].id)
        let newPosts = this.state.posts

        newPosts.map(newPost => {
            newPost["timeStamp"] = this.state.timeStamp
        })

        // newPosts[0]["timestamp"] = 0
        this.setState({ posts: newPosts })
        // console.log(this.state.data[0].address.street)
        this.getUserPosts()
    }

    getUserPosts = () => {
        let tempArray = []
        this.state.posts.map(post => {
            if (post.userId == this.state.userId) {
                console.log("in map function!!!!!!!!!!!!!!!!!!!!!!!")
                tempArray.push({
                    userId: post.userId,
                    timeStamp: post.timeStamp,
                    body: post.body
                }
                )
            }
        })
        this.setState({ userPosts: tempArray }, () => {
            this.setState({filteredPosts: this.state.userPosts})
        })
        console.log(this.state.filteredPosts)
        console.log(this.state.userPosts)
        console.log(typeof this.state.userId)
    }



    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }



    //push a new json object every time this function is called
    // addFriend = () => {
    //     let tempArray = this.state.friendsList
    //     let dupFlg = false

    //     this.state.friendsList.map(existingId => {
    //         if (this.state.newFriendId === existingId) {
    //             dupFlg = true
    //         }
    //     })
    //     if (this.state.newFriendId > 0 && this.state.newFriendId <= 10 && dupFlg === false) {
    //         tempArray.push(this.state.newFriendId)
    //         this.setState({friendsList : tempArray})
    //     } 
    // }

    addFriend = () => {
        let tempArray = this.state.friends
        let newFriend = {
            company: { catchPhrase: "In a relationship" },
            username: this.state.newFriendName
        }
        if (newFriend.username != "") {
            tempArray.push(newFriend)
        }
        // tempArray.push(newFriend)
        this.setState({ friends: tempArray })
    }


    addPost = () => {
        let increasedStamp = this.state.timeStamp + 1
        this.setState({ timeStamp: increasedStamp }, () => {
            console.log("in updateUserPosts")
            let tempArray = this.state.userPosts
            let newPost = {
                body: this.state.newPost,
                timeStamp: this.state.timeStamp,
                userId: this.state.userId,
                userName: this.state.userName
            }
            tempArray.push(newPost)
            this.setState({ userPosts: tempArray })
            this.state.userPosts.sort((a, b) => parseInt(b.timeStamp) - parseInt(a.timeStamp))
            this.setState({filteredPosts: this.state.userPosts})
            this.clearPost()

        })
        // tempArray.sort((a, b) => parseInt(b.timeStamp) - parseInt(a.timeStamp))
        // this.setState({userPosts: tempArray})
    }

    clearPost = () => {
        this.setState({ newPost: "" })
    }

    handleStatusChange = newStatus => {
        this.setState({ status: newStatus })

    }

    handleSearch = e => {
        this.setState({searchPost: e.target.value}, () => this.filterPost())
    }


    filterPost = () => {
        let filtered = this.state.userPosts.filter(post => {
            return post.body.toLowerCase().includes(this.state.searchPost.toLowerCase())
        }) 
        this.setState({filteredPosts: filtered})
        console.log(this.state.filteredPosts)
    }


    render() {
        // if(!localStorage.getItem('userId')) {
        //     return <Redirect to='/' push></Redirect>
        // }
        return (
            <div>
                <Row>
                    <Col>
                        <div>
                            <User username={this.state.users ? this.state.users[this.state.userId - 1].username : ''}
                                status={this.state.status ? this.state.status : ''}
                                updateStatus={this.handleStatusChange} />


                            <Card style={{ width: '25rem' }}>

                                {this.state.friends.map(friend => (
                                    <Friend friendName={this.state.friends ? friend.username : ''}
                                        friendStatus={this.state.friends ? friend.company.catchPhrase : ''} />
                                ))}

                                <div>
                                    <input
                                        name="newFriendName"
                                        value={this.state.newFriendName}
                                        onChange={this.change}
                                        placeholder="User">
                                    </input>
                                    <Button variant="primary" onClick={this.addFriend}>Add</Button>
                                </div>
                            </Card>



                            {/* {this.state.array.map(number => (
                                <Friend></Friend>
                            ))} */}
                            {/* <Friend></Friend> */}
                        </div>
                    </Col>
                    <Col>
                        <Card style={{ width: '25rem' }}>

                            <Row>

                                <input type="file" />
                                <tex    tarea type="text" name="newPost" value={this.state.newPost}
                                    onChange={this.change} placeholder="Your post here" />
                           
                                    {/* <FormControl placeholder="Your post here" as="textarea" 
                                    value={this.state.newPost} onChange={this.change}/> */}
                             
                            </Row>


                            <Row>
                                    
                                <Button variant="primary" onClick={this.clearPost}>Cancel</Button>
                                <Button variant="primary" onClick={this.addPost}>Post</Button>
                            </Row>
                        </Card>

                    <Card style={{ width: '25rem'}}>
                        <div>
                            <input width="25rem" type="text" onChange={this.handleSearch} placeholder="search here"/>
                        </div>

                    </Card>                   
                        


                        {/* <div>
                            {this.state.userPosts.map(userPost => (
                                <Post postText={this.state.userPosts ? userPost.body : ''} />
                            )
                            )}
                        </div> */}

                        <div>
                            {
                                this.state.filteredPosts ? this.state.filteredPosts.map(post => (
                                    <Post postText={post.body} />
                                )) 
                                : 
                                ''
                            }
                        </div>

                    </Col>
                </Row>

            </div>
        )
    }
}

export default Main
