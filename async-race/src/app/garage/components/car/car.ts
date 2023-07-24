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
  private startBtn!: Button
  private stopBtn!: Button
  private updateBtn!: Button
  private deleteBtn!: Button
  private id: number
  private name: string
  private color: string
  private isCarOnStart = true
  private isCarDriving = false
  private animationRequestId = 0

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
    this.updateBtn = new Button({ className: 'car__controls-btn', content: 'Change' }, () => {
      handlers.update({ id: this.id, name: this.name, color: this.color })
    })
    this.deleteBtn = new Button({ className: 'car__controls-btn', content: 'Delete' }, () => {
      handlers.delete(this.id)
    })
    this.startBtn = new Button({ className: 'car__controls-btn', content: 'Start' }, () => {
      this.startBtn.toggleDisable(true)
      handlers.start(this.id)
    })
    this.stopBtn = new Button({ className: 'car__controls-btn', content: 'Stop' }, () => {
      this.stopBtn.toggleDisable(true)
      handlers.stop(this.id)
    })
    controlsContainer.append(this.updateBtn, this.deleteBtn, this.startBtn, this.stopBtn)
    this.stopBtn.toggleDisable(true)
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

  public animateCar(duration: number): void {
    let animationStart: number | null = null
    const startAnimation = (timestamp: number): void => {
      if (!animationStart) {
        animationStart = timestamp
        this.isCarDriving = true
      }
      const progress = (100 * (timestamp - animationStart)) / duration
      this.carItem.setStyle({ transform: `translateX(${progress}%)` })

      if (progress < 100) {
        this.animationRequestId = window.requestAnimationFrame(startAnimation)
      } else {
        window.cancelAnimationFrame(this.animationRequestId)
        this.isCarDriving = false
      }
    }
    this.stopBtn.toggleDisable(false)
    this.animationRequestId = window.requestAnimationFrame(startAnimation)
    this.isCarOnStart = false
  }

  public pauseAnimation(): void {
    if (this.isCarDriving) {
      window.cancelAnimationFrame(this.animationRequestId)
      this.isCarDriving = false
      this.animationRequestId = 0
    }
  }

  public returnToStart(): void {
    this.carItem.setStyle({ transform: 'translateX(0)' })
    this.isCarOnStart = true
    this.startBtn.toggleDisable(false)
  }

  public get isDriving(): boolean {
    return this.isCarDriving
  }
}
