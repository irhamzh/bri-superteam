/* eslint-disable react/prop-types */
import { Collapse, Card, CardBody, FormGroup, Label, Input } from 'reactstrap'
import React from 'react'

export default function ListCheckboxShow(props) {
  const { isShow, data, handleShowCheckbox } = props
  const isSelected = (data) => {
    return data?.show
  }
  return (
    <Collapse isOpen={isShow}>
      <Card>
        <CardBody>
          {data &&
            data.map((item) => (
              <FormGroup key={item.Header} check inline>
                <Label check>
                  <Input
                    type="checkbox"
                    checked={isSelected(item)}
                    onChange={(e) => handleShowCheckbox(e, item)}
                  />
                  {item.Header}
                </Label>
              </FormGroup>
            ))}
        </CardBody>
      </Card>
    </Collapse>
  )
}
