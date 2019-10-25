import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export class Friends extends Component {

    render() {
        return (
            <div>
                <Card style={{ width: '25rem' }}>
                    <Card.Body>
                        <Card style={{ width: '15rem' }}>
                            <Card.Img variant="top" src="https://picsum.photos/800/400" />

                            <Card.Title>{this.props.friendName}</Card.Title>
                            <Card.Text>
                                {this.props.friendStatus}
                            </Card.Text>

                        </Card>
                    </Card.Body>

                </Card>
            </div>
        )
    }
}

export default Friends
