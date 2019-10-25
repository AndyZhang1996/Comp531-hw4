import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export class Post extends Component {
    render() {
        return (
            <div>
                <Card style={{ width: '25rem' }}>
                    <Card.Body>
                        <Card style={{ width: '15rem' }}>
                            <Card.Img variant="top" src="https://picsum.photos/id/1/800/400" />
                            
                                {/* <Card.Title>this should be the text of the post</Card.Title> */}
                                <Card.Text>
                                    {this.props.postText}
                                </Card.Text>
                           
                        </Card>
                        <div>
                            <Button variant="primary">Edit</Button>
                            <Button variant="primary">Comment</Button>
                        </div>
                    </Card.Body>


                </Card>

            </div>
        )
    }
}

export default Post
