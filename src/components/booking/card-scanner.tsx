"use client";

import styles from "./card-scanner.module.css";
import { cn } from "@/lib/utils";

interface CardScannerProps {
    className?: string;
    price?: number;
}

export function CardScanner({ className, price = 0 }: CardScannerProps) {
    return (
        <div className={cn(styles.container, className)}>
            <div className={styles["left-side"]}>
                <div className={styles.card}>
                    <div className={styles["card-line"]}></div>
                    <div className={styles.buttons}></div>
                </div>
                <div className={styles.post}>
                    <div className={styles["post-line"]}></div>
                    <div className={styles.screen}>
                        <div className={styles.dollar}>${price}</div>
                    </div>
                    <div className={styles.numbers}></div>
                    <div className={styles["numbers-line2"]}></div>
                </div>
            </div>
            <div className={styles["right-side"]}>
                <div className={styles.new}>Checkout</div>
            </div>
        </div>
    );
}
