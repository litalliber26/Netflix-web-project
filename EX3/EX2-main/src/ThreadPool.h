// ThreadPool.h
#ifndef THREADPOOL_H
#define THREADPOOL_H

#include <vector>
#include <thread>
#include <queue>
#include <mutex>
#include <condition_variable>
#include <functional>
#include <atomic>

class ThreadPool {
private:
    std::vector<std::thread> workers;        // Threads in the pool
    std::queue<std::function<void()>> tasks; // Task queue
    std::mutex queueMutex;                   // Mutex for queue synchronization
    std::condition_variable condition;       // Condition variable for task management
    std::atomic<bool> stop;                  // To signal stopping the pool

public:
    explicit ThreadPool(size_t threads);
    ~ThreadPool();

    // Add a new task to the queue
template <class F>
void enqueue(F&& f) {
    {
        std::unique_lock<std::mutex> lock(queueMutex);
        tasks.emplace(std::forward<F>(f));
    }
    condition.notify_one();
}
};

#endif // THREADPOOL_H
