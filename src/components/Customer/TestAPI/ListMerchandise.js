import React, { Component } from 'react';

class MerchandiseViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            error: null
        };
    }

    componentDidMount() {

        fetch('http://localhost:8081/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');

                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ data, loading: false });

            })
            .catch(error => {
                console.error('Error fetching data:', error);
                this.setState({ error, loading: false });
            });
    }

    render() {
        const { data, loading, error } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error.message}</div>;
        }

        return (
            <div>

            </div>
        );
    }
}

export default MerchandiseViewer;
