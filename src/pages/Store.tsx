import { Col, Row } from "react-bootstrap"
import storeItems from "../data/items.json"
import {StoreItem} from "../components/StoreItem"

export function Store() {
  return (
    <>
      <h1>Art Store</h1>
      {/* 2 column medium screen, 1 small, 3 large, gap of 3 */}
      <Row md={2} xs={1} lg={3} className="g-3" >
        {storeItems.map(item => {
          return (
            <Col>
              {/* {JSON.stringify(item)}   */}
              <StoreItem {...item}/>
            </Col>
          ); 
        })}
      </Row>
    </>
  )
}