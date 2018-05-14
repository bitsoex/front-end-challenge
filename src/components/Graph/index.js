import React from 'react'

function Graph(props) {
  return (
    <div className="graph-container">
      <div className="actions-container">
        <div className="type-duration-container">
          <div>
            <ul />
          </div>
          <div>
            <span>Periodo</span>
            <ul />
          </div>
          <div>
            <span>Intervalo</span>
          </div>
        </div>
        <div className="zoom">
          <div />
        </div>
      </div>
      <div className="graph" />
    </div>
  )
}

export default Graph
