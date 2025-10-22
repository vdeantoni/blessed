/**
 * Platform-agnostic EventEmitter base class
 *
 * Provides EventEmitter functionality without Node.js dependencies
 * by delegating to runtime-provided EventEmitter implementation.
 *
 * This allows @unblessed/core to remain platform-agnostic while providing
 * full EventEmitter functionality. The actual EventEmitter comes from:
 * - @unblessed/node: Node.js events.EventEmitter
 * - @unblessed/browser: EventEmitter polyfill (e.g., eventemitter3)
 */

import { getRuntime, type EventEmitterType } from "./runtime-helpers.js";

/**
 * Base class providing EventEmitter functionality
 *
 * Classes can extend this to get event handling capabilities
 * without importing from Node.js 'events' module.
 *
 * @example
 * ```typescript
 * class MyClass extends EventEmitterBase {
 *   constructor() {
 *     super();
 *     // Your initialization
 *   }
 *
 *   doSomething() {
 *     this.emit('something', { data: 'value' });
 *   }
 * }
 *
 * const obj = new MyClass();
 * obj.on('something', (data) => console.log(data));
 * obj.doSomething();
 * ```
 */
export class EventEmitterBase implements EventEmitterType {
  private _emitter: EventEmitterType;

  constructor() {
    const runtime = getRuntime();
    const EventEmitter = runtime.utils.events.EventEmitter;
    this._emitter = new EventEmitter();
  }

  on(event: string | symbol, listener: (...args: any[]) => void): this {
    this._emitter.on(event, listener);
    return this;
  }

  addListener(
    event: string | symbol,
    listener: (...args: any[]) => void,
  ): this {
    this._emitter.addListener(event, listener);
    return this;
  }

  once(event: string | symbol, listener: (...args: any[]) => void): this {
    this._emitter.once(event, listener);
    return this;
  }

  emit(event: string | symbol, ...args: any[]): boolean {
    return this._emitter.emit(event, ...args);
  }

  removeListener(
    event: string | symbol,
    listener: (...args: any[]) => void,
  ): this {
    this._emitter.removeListener(event, listener);
    return this;
  }

  off(event: string | symbol, listener: (...args: any[]) => void): this {
    this._emitter.off(event, listener);
    return this;
  }

  removeAllListeners(event?: string | symbol): this {
    this._emitter.removeAllListeners(event);
    return this;
  }

  listeners(event: string | symbol): Function[] {
    return this._emitter.listeners(event);
  }

  listenerCount(event: string | symbol): number {
    return this._emitter.listenerCount(event);
  }

  eventNames(): (string | symbol)[] {
    return this._emitter.eventNames();
  }

  setMaxListeners(n: number): this {
    this._emitter.setMaxListeners(n);
    return this;
  }

  getMaxListeners(): number {
    return this._emitter.getMaxListeners();
  }

  prependListener(
    event: string | symbol,
    listener: (...args: any[]) => void,
  ): this {
    this._emitter.prependListener(event, listener);
    return this;
  }

  prependOnceListener(
    event: string | symbol,
    listener: (...args: any[]) => void,
  ): this {
    this._emitter.prependOnceListener(event, listener);
    return this;
  }

  rawListeners(event: string | symbol): Function[] {
    return this._emitter.rawListeners(event);
  }
}

export default EventEmitterBase;
