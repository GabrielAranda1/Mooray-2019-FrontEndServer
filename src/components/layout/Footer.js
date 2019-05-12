import React, { Component } from 'react'

class Footer extends Component {
    render() {
        return (
            <footer class="bg-dark text-white mt-5 p-4 text-center footer">
                Copyright &copy; {new Date().getFullYear()} Gabriel Aranda
      </footer>
        )
    }
}

export default Footer