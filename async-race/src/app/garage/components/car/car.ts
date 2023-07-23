import { BaseComponent } from '@utils/base-component'
import { CarItem } from '@garage/components/car-item/car-item'
import type { CarResponse } from '@core/models/car-response.model'
import { Button } from '@shared/components/button/button'
import type { Component } from '@core/models/component.model'
import type { CarHandlers } from '@garage/models/carHandlers.model'
import './car.scss'

export class Car extends BaseComponent {
  private carItem: CarItem
  private title = new BaseComponent({ tag: 'h3', className: 'car__title' })
  private id: number
  private name: string
  private color: string

  constructor({ id, name, color }: CarResponse, handlers: CarHandlers) {
    super({ className: 'car__container' })
    this.id = id
    this.name = name
    this.color = color
    const header = new BaseComponent({ tag: 'header', className: 'car__header' })
    const controls = this.createControls(handlers)
    header.append(controls, this.title)
    const carTrack = new BaseComponent({ className: 'car__track' })
    this.carItem = new CarItem(this.color)
    this.title.setContent(this.name)
    carTrack.append(this.carItem)
    this.append(header, carTrack)
  }

  private createControls(handlers: CarHandlers): Component {
    const controlsContainer = new BaseComponent({ className: 'car__controls' })
    const updateBtn = new Button({ className: 'car__controls-btn', content: 'Change' }, () => {
      handlers.update({ id: this.id, name: this.name, color: this.color })
    })
    const deleteBtn = new Button({ className: 'car__controls-btn', content: 'Delete' }, () => {
      handlers.delete(this.id)
    })
    const startBtn = new Button({ className: 'car__controls-btn', content: 'Start' }, () => {
      handlers.start(this.id)
    })
    const stopBtn = new Button({ className: 'car__controls-btn', content: 'Stop' }, () => {
      handlers.stop(this.id)
    })
    controlsContainer.append(updateBtn, deleteBtn, startBtn, stopBtn)
    return controlsContainer
  }

  public changeColor(color: string): void {
    this.color = color
    this.carItem.changeColor(color)
  }

  public changeName(name: string): void {
    this.name = name
    this.title.setContent(this.name)
  }
}
