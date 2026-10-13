import * as React from 'react';
import styles from './Countdown.module.scss';
import type { ICountdownProps } from './ICountdownProps';

interface ICountdownState {
  now: number;
}

const pad = (n: number): string => (n < 10 ? `0${n}` : `${n}`);

export default class Countdown extends React.Component<ICountdownProps, ICountdownState> {
  private _timer: number | undefined;

  constructor(props: ICountdownProps) {
    super(props);
    this.state = { now: Date.now() };
  }

  public componentDidMount(): void {
    this._timer = window.setInterval(() => this.setState({ now: Date.now() }), 1000);
  }

  public componentWillUnmount(): void {
    if (this._timer !== undefined) {
      window.clearInterval(this._timer);
    }
  }

  public render(): React.ReactElement<ICountdownProps> {
    const { title, subtitle, targetDate, finishedText } = this.props;

    const target = Date.parse(targetDate);
    const valid = !isNaN(target);
    const remaining = valid ? Math.max(0, Math.floor((target - this.state.now) / 1000)) : 0;
    const finished = valid && remaining === 0;

    const units = [
      { label: 'days', value: Math.floor(remaining / 86400) },
      { label: 'hrs', value: Math.floor((remaining % 86400) / 3600) },
      { label: 'min', value: Math.floor((remaining % 3600) / 60) },
      { label: 'sec', value: remaining % 60 }
    ];

    return (
      <section className={styles.countdown}>
        <div className={styles.content}>
          <div>
            {title && <h2 className={styles.title}>{title}</h2>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          {!valid && <p className={styles.message}>Set a valid target date in the web part properties.</p>}
          {finished && <p className={styles.message}>{finishedText}</p>}
          {valid && !finished && (
            <div className={styles.timer} role="timer" aria-label={`${units[0].value} days remaining`}>
              {units.map(u => (
                <div key={u.label} className={styles.unit}>
                  <div className={styles.number}>{pad(u.value)}</div>
                  <div className={styles.label}>{u.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }
}
